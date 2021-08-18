/*eslint eqeqeq: "off"*/

import * as tf from '@tensorflow/tfjs';
import { Action } from '../Step';

export default class Dqn {
    constructor(bufferSize, gamma) {
        this.bufferSize = bufferSize;
        this.gamma = gamma;
        this.reset();
    }

    reset() {
        this.mainModel = tf.sequential();
        this.mainModel.add(tf.layers.dense({units: 4, inputShape: 16, activation: 'relu'}));
        this.mainModel.compile({loss: 'meanSquaredError', optimizer: 'adam'});

        this.targetModel = tf.sequential();
        this.targetModel.add(tf.layers.dense({units: 4, inputShape: 16, activation: 'relu'}));

        this.updateTargetModel();
        this.replayBuffer = [];
    }

    async step(game, epsilon) {
        const state = game.stateAsTensor();
        const action = await this.epsilonGreedy(state, game.allowedActions(), epsilon);
        const transition = await game.step(action);

        this.storeTransition(transition);
        return transition;
    }

    updateTargetModel() {
        for (const i in this.mainModel.layers) {
            const weights = this.mainModel.layers[i].getWeights();
            this.targetModel.layers[i].setWeights(weights);
        }
    }

    storeTransition(transition) {
        this.replayBuffer.unshift(transition);

        if (this.replayBuffer.length === this.bufferSize + 1) {
            this.replayBuffer.pop();
        }
    }

    async epsilonGreedy(state, actionSpace, epsilon) {
        if (Math.random() < epsilon) {
            const randIndex = Math.floor(Math.random() * actionSpace.length);
            return actionSpace[randIndex];
        }
        const qValues = this.mainModel.predict(state);
        const argMax = await qValues.argMax(-1).dataSync();

        return Action.fromOrdinal(argMax[0]);
    }

    async trainModel(batchSize) {
        if (this.replayBuffer.length < batchSize) {
            return;
        }

        for (const transition of this.miniBatch(batchSize)) {
            let targetQ = transition.reward;
            if (!transition.done) {
                targetQ += this.gamma * this.targetValue(transition.nextState);
            }

            let expected = this.mainModel.predict(transition.state).arraySync();
            expected[0][transition.action.enumOrdinal] = targetQ;

            await this.mainModel.fit(transition.state, tf.tensor2d(expected), { epochs: 1, batchSize: 1, shuffle: false });
        }
    }

    miniBatch(batchSize) {
        if (batchSize >= this.replayBuffer.length) {
            let clonedBuffer = [...this.replayBuffer];
            tf.util.shuffle(clonedBuffer);
            return clonedBuffer;
        }

        const bufferSize = this.replayBuffer.length;
        let miniBatch = new Set();

        while (miniBatch.size != batchSize) {
            const randomIndex = Math.floor(Math.random() * bufferSize);
            miniBatch.add(this.replayBuffer[randomIndex]);
        }
        return miniBatch;
    }

    async targetValue(nextState) {
        const mainPred = this.mainModel.predict(nextState);
        const targetPred = this.targetModel.predict(nextState);
        const maxAction = await mainPred.argMax(-1).data();

        return targetPred.arraySync()[0][maxAction[0]];
    }
}