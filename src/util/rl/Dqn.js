/*eslint eqeqeq: "off"*/
import * as tf from '@tensorflow/tfjs';

export default class Dqn {
    constructor(bufferSize, gamma, layers) {
        this.bufferSize = bufferSize;
        this.gamma = gamma;
        this.layers = layers;
        this.reset();
    }

    /**
     * 
     */
    reset() {
        this.mainModel = tf.sequential();
        for (const layer of this.layers) {
            this.mainModel.add(tf.layers.dense(layer));
        }
        this.mainModel.compile({loss: 'meanSquaredError', optimizer: 'adam'});

        this.targetModel = tf.sequential();
        for (const layer of this.layers) {
            this.targetModel.add(tf.layers.dense(layer));
        }
        this.updateTargetModel();
        this.replayBuffer = [];
    }

    /**
     * 
     * @param {*} game 
     * @param {*} epsilon 
     * @returns 
     */
    async step(game, epsilon) {
        const state = game.stateAsTensor();
        const action = await this.epsilonGreedy(state, game.allowedActions(), epsilon);
        const transition = await game.step(action);

        this.storeTransition(transition);
        return transition;
    }

    /**
     * 
     */
    updateTargetModel() {
        for (const i in this.mainModel.layers) {
            const weights = this.mainModel.layers[i].getWeights();
            this.targetModel.layers[i].setWeights(weights);
        }
    }

    /**
     * 
     * @param {*} transition 
     */
    storeTransition(transition) {
        this.replayBuffer.unshift(transition);

        if (this.replayBuffer.length === this.bufferSize + 1) {
            this.replayBuffer.pop();
        }
    }

    /**
     * 
     * @param {*} state 
     * @param {*} actionSpace 
     * @param {*} epsilon 
     * @returns 
     */
    async epsilonGreedy(state, actionSpace, epsilon) {
        if (Math.random() < epsilon) {
            const randIndex = Math.floor(Math.random() * actionSpace.length);
            return actionSpace[randIndex];
        }
        const qValues = this.mainModel.predict(state);
        const argMax = await qValues.argMax(-1).dataSync();

        return argMax[0];
    }

    /**
     * 
     * @param {*} batchSize 
     * @returns 
     */
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

    /**
     * 
     * @param {*} batchSize 
     * @returns 
     */
    miniBatch(batchSize) {
        if (batchSize >= this.replayBuffer.length) {
            let clonedBuffer = [...this.replayBuffer];
            tf.util.shuffle(clonedBuffer);
            return clonedBuffer;
        }

        const bufferSize = this.replayBuffer.length;
        const miniBatch = new Set();

        while (miniBatch.size != batchSize) {
            const randomIndex = Math.floor(Math.random() * bufferSize);
            miniBatch.add(this.replayBuffer[randomIndex]);
        }
        return miniBatch;
    }

    /**
     * 
     * @param {*} nextState 
     * @returns 
     */
    async targetValue(nextState) {
        const mainPred = this.mainModel.predict(nextState);
        const targetPred = this.targetModel.predict(nextState);
        const maxAction = await mainPred.argMax(-1).data();

        return targetPred.arraySync()[0][maxAction[0]];
    }
}