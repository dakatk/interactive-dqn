import AsyncComponent from "../../../util/interface/AsyncComponent";
import Dqn from "../../../util/rl/Dqn";
import sleep from "../../../util/Sleep";

export default class TrainingComponent extends AsyncComponent {
    constructor(props) {
        super(props);

        const bufferSize = props.params.bufferSize;
        const gamma = props.params.gamma;
        const layers = props.params.layers;
        this.dqn = new Dqn(bufferSize, gamma, layers);
    }

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

    async singleEpisode(maxSteps, epsilon, batchSize, stepDelay) {
        for (let step = 0; step < maxSteps; step ++) {
            const transition = await this.dqn.step(this.game, epsilon);

            await this.setStateAsync({ currentStep: step + 1 });
            await sleep(stepDelay);
            this.forceUpdate();

            if (transition.done) {
                break;
            }
        }
        await this.game.reset();
        await this.dqn.trainModel(batchSize);
        this.dqn.updateTargetModel();
    }

    async singleStep(epsilon, updateTarget, batchSize) {
        const step = await this.dqn.step(this.game, epsilon);
        console.log(step);

        if (step.done) {
            await this.game.reset();
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