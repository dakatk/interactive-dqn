import AsyncComponent from "../../../util/AsyncComponent";
import Dqn from "../../../util/rl/Dqn";

export default class TrainingComponent extends AsyncComponent {
    constructor(props) {
        super(props);

        const bufferSize = props.params.bufferSize;
        const gamma = props.params.gamma;
        const layers = props.params.layers;
        this.dqn = new Dqn(bufferSize, gamma, layers);
    }

    /**
     * Trains the DQN for a set number of epsiodes
     * using the given parameters
     * 
     * @param {number} episodes 
     * @param {number} maxSteps 
     * @param {number} batchSize 
     * @param {number} epsilonMax 
     * @param {number} epsilonMin 
     * @param {number} stepDelay 
     */
    async fullyTrain(episodes, maxSteps, batchSize, epsilonMax, epsilonMin, stepDelay) {
        const epsDecay = (epsilonMax - epsilonMin) / episodes;
        let epsilon = epsilonMax;

        for (let episode = 0; episode < episodes; episode ++) {
            await this.setStateAsync({ currentEpisode: episode + 1 });
            await this.singleEpisode(maxSteps, epsilon, batchSize, stepDelay);

            if (epsilon > epsilonMin) {
                epsilon = (epsilonMax - epsilonMin) * Math.exp(-epsDecay * episode) + epsilonMin;
            }
        }
        this.dqn.updateTargetModel();
    }

    /**
     * Performs a single episode in the DQN's training cycle
     * using the given parameters
     * 
     * @param {number} maxSteps 
     * @param {number} epsilon 
     * @param {number} batchSize 
     * @param {number} stepDelay 
     */
    async singleEpisode(maxSteps, epsilon, batchSize, stepDelay) {
        for (let step = 0; step < maxSteps; step ++) {
            const transition = await this.dqn.step(this.game, epsilon);

            await this.setStateAsync({ currentStep: step + 1 });
            await this.sleep(stepDelay);
            this.forceUpdate();

            if (transition.done) {
                break;
            }
        }
        await this.game.reset();
        await this.dqn.trainModel(batchSize);
        this.dqn.updateTargetModel();
    }

    /**
     * Completes a single step of the current episode
     * of the DQN's training cycle using the given parameters
     * 
     * @param {number} epsilon 
     * @param {number} updateTarget 
     * @param {number} batchSize 
     */
    async singleStep(epsilon, updateTarget, batchSize) {
        const step = await this.dqn.step(this.game, epsilon);
        if (step.done) {
            await this.game.reset();
            await this.dqn.trainModel(batchSize);
        }
        if (updateTarget) {
            this.dqn.updateTargetModel();
        }
    }

    /**
     * Resets the DQN to it's initial (untrained) state
     */
    reset() {
        this.dqn.reset();
    }

    /**
     * @param {number} ms The number of milliseconds to delay
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, parseInt(ms)));
    }
}