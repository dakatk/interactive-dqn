import Dqn from './Dqn';
import sleep from '../Sleep'

export default class Trainer {
    constructor(bufferSize, gamma, layers) {
        this.dqn = new Dqn(bufferSize, gamma, layers);
    }

    async fullyTrain(component, episodes, maxSteps, batchSize, epsilonMax, epsilonMin, stepDelay) {
        const epsDecay = (epsilonMax - epsilonMin) / episodes;
        let epsilon = epsilonMax;

        for (let episode = 0; episode < episodes; episode ++) {
            await component.setStateAsync({ currentEpisode: episode + 1 });
            await this.singleEpisode(component, maxSteps, epsilon, batchSize, stepDelay);

            if (epsilon > epsilonMin) {
                epsilon = (epsilonMax - epsilonMin) * Math.exp(-epsDecay * episode) + epsilonMin;
            }
        }
        this.dqn.updateTargetModel();
    }

    async singleEpisode(component, maxSteps, epsilon, batchSize, stepDelay) {
        for (let step = 0; step < maxSteps; step ++) {
            const transition = await this.dqn.step(component.game, epsilon);

            await component.setStateAsync({ currentStep: step + 1 });
            await sleep(stepDelay);
            component.forceUpdate();

            if (transition.done) {
                break;
            }
        }
        await component.game.reset();
        await this.dqn.trainModel(batchSize);
        this.dqn.updateTargetModel();
    }

    async singleStep(component, epsilon, updateTarget, batchSize) {
        const step = await this.dqn.step(component.game, epsilon);

        if (step.done) {
            await component.game.reset();
            await this.dqn.trainModel(batchSize);
        }
        if (updateTarget) {
            this.dqn.updateTargetModel();
        }
    }

    reset() {
        this.dqn.reset();
    }
}