import React from 'react';
import ParamsModel from './models/Params.json';
import sleep from '../util/Sleep';
import AsyncComponent from '../util/AsyncComponent';
import Dqn from '../util/rl/Dqn';
import Controls from './controls/Controls';
import FrozenLake from './frozen-lake/FrozenLake';
import './App.css';

export default class App extends AsyncComponent {
    constructor(props) {
        super(props);

        this.state = { 
            currentStep: 0, 
            currentEpisode: 0, 
            controlMode: 'step' 
        };
        this.gameRef = React.createRef();
        
        this.onPlay = this.onPlay.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onModeSelect = this.onModeSelect.bind(this);
    }

    componentDidMount() {
        this.game = this.gameRef.current;
        this.dqn = new Dqn(ParamsModel.bufferSize, ParamsModel.gamma);
    }

    async onPlay(controlState) {
        switch (controlState.mode) {
            case 'step':
                await this.singleStep(
                    controlState.epsilon, 
                    controlState.updateTarget, 
                    controlState.batchSize
                );
                break;

            case 'episode':
                await this.singleEpisode(
                    controlState.maxSteps, 
                    controlState.epsilon, 
                    controlState.batchSize,
                    controlState.stepDelay
                );
                break;

            case 'train':
                await this.fullyTrain(
                    controlState.episodes, 
                    controlState.maxSteps, 
                    controlState.batchSize, 
                    controlState.epsilonMax, 
                    controlState.epsilonMin,
                    controlState.stepDelay
                );
                this.dqn.updateTargetModel();
                break;

            default:
                break;
        }
    }

    async onReset() {
        await this.setStateAsync({ 
            currentStep: 0, 
            currentEpisode: 0 
        });
        await this.game.reset();
        this.dqn.reset();
    }

    async onModeSelect(mode) {
        await this.setStateAsync({ 
            currentStep: 0, 
            currentEpisode: 0,
            controlMode: mode
        });
        await this.game.reset();
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

        if (step.done) {
            await this.game.reset();
            await this.dqn.trainModel(batchSize);
        }
        if (updateTarget) {
            this.dqn.updateTargetModel();
        }
    }

    showCurrentStep() {
        const mode = this.state.controlMode;
        if (mode === 'episode' || mode === 'train') {
            return <h3>Step: {this.state.currentStep}</h3>
        }
    }

    showCurrentEpisode() {
        if (this.state.controlMode === 'train') {
            return <h3>Episode: {this.state.currentEpisode}</h3>
        }
    }

    render() {
        return <div>
            <div id="controls-container">
                <Controls onPlay={this.onPlay} onReset={this.onReset} onModeSelect={this.onModeSelect}/>
            </div>
            <div id="game-container">
                <FrozenLake ref={this.gameRef} />
            </div>
            <div id="count-container">
                {this.showCurrentStep()}
                {this.showCurrentEpisode()}
            </div>
        </div>
    }
}