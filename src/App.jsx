import React from 'react';
import './App.css';
import FrozenLake from './game/FrozenLake';
import Dqn from './game/util/rl/Dqn';
import controls from './models/Controls.json';
import params from './models/Params.json';
import sleep from './util/Sleep';
import AsyncComponent from './util/AsyncComponent';

export default class App extends AsyncComponent {
    constructor(props) {
        super(props);

        this.gameRef = React.createRef();
        this.state = {
            mode: 'step',
            epsilon: 0.5,
            epsilonMax: 1.0,
            epsilonMin: 0.0,
            maxSteps: 20,
            updateTarget: false,
            episodes: 1000,
            batchSize: 32,
            running: false,
            currentStep: 0,
            currentEpisode: 0,
            stepDelay: 500
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleModeSelectChange = this.handleModeSelectChange.bind(this);
        this.handlePlayButtonPress = this.handlePlayButtonPress.bind(this);
        this.handleResetButtonPress = this.handleResetButtonPress.bind(this);
    }

    componentDidMount() {
        this.game = this.gameRef.current;
        this.dqn = new Dqn(params.bufferSize, params.gamma);
    }

    async reset(resetNetwork) {
        await this.setStateAsync({ 
            running: false, 
            currentStep: 0, 
            currentEpisode: 0 
        });
        await this.game.reset();
        
        if (resetNetwork) {
            this.dqn.reset();
        }
    }

    async handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setStateAsync({ [name]: value });
    }

    async handleModeSelectChange(e) {
        await this.handleInputChange(e);
        await this.reset(false);
    }

    async handlePlayButtonPress() {
        const epsilon = this.state.epsilon;
        const updateTarget = this.state.updateTarget;
        const maxSteps = this.state.maxSteps;
        const episodes = this.state.episodes;
        const batchSize = this.state.batchSize;
        const epsilonMax = this.state.epsilonMax;
        const epsilonMin = this.state.epsilonMin;

        await this.setStateAsync({ running: true });

        switch (this.state.mode) {
            case 'step':
                await this.singleStep(epsilon, updateTarget, batchSize);
                break;

            case 'episode':
                await this.singleEpisode(maxSteps, epsilon, batchSize);
                break;

            case 'train':
                await this.fullyTrain(episodes, maxSteps, batchSize, epsilonMax, epsilonMin);
                this.dqn.updateTargetModel();
                break;

            default:
                break;
        }
        await this.setStateAsync({ running: false });
    }

    async handleResetButtonPress() {
        await this.reset(true);
    }

    async fullyTrain(episodes, maxSteps, batchSize, epsilonMax, epsilonMin) {
        const epsDecay = (epsilonMax - epsilonMin) / episodes;
        let epsilon = epsilonMax;

        for (let episode = 0; episode < episodes && this.state.running; episode ++) {
            await this.setStateAsync({ currentEpisode: episode + 1 });
            await this.singleEpisode(maxSteps, epsilon, batchSize);

            if (epsilon > epsilonMin) {
                epsilon = (epsilonMax - epsilonMin) * Math.exp(-epsDecay * episode) + epsilonMin;
            }
        }
    }

    async singleEpisode(maxSteps, epsilon, batchSize) {
        for (let step = 0; step < maxSteps && this.state.running; step ++) {
            const transition = await this.dqn.step(this.game, epsilon);

            await this.setStateAsync({ currentStep: step + 1 });
            await sleep(this.state.stepDelay);
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

    createControlsForMode() {
        let controlsElements = [];

        for (const el of controls[this.state.mode]) {
            const props = el.props;
            const label = el.label;
            const tooltip = el.tooltip;

            controlsElements.push(this.createLabel(label, props.name, tooltip));
            controlsElements.push(this.createInput(props));
        }

        return <div id="mode-controls">
            {controlsElements}
        </div>
    }

    createLabel(labelText, labelFor, tooltip) {
        return <label 
                className="control" 
                htmlFor={labelFor}
                title={tooltip}
                id={labelFor + '-label'} 
                key={labelFor + "-label"}>{labelText + ':'}&nbsp;
            </label>
    }

    createInput(props) {
        const name = props.name;
        const className = "control labeled";
        const onChange = this.handleInputChange;
        const value = this.state[name];
        const key = name + '-input';

        let elementProps = {
            ...props, 
            className,
            onChange,
            value,
            key
        };
        return React.createElement('input', elementProps);
    }

    showCurrentStep() {
        const mode = this.state.mode;
        return mode === 'episode' || mode === 'train';
    }

    showCurrentEpisode() {
        return this.state.mode === 'train';
    }

    render() {
        return <div>
            <div id="controls-container">
                <div id="controls-box">
                    <div id="static-controls">
                        <select className="control" id="mode-select" name="mode" title="Mode select" 
                            onChange={this.handleModeSelectChange} defaultValue="step">
                            <option value="step">Single Step</option>
                            <option value="episode">Single Episode</option>
                            <option value="train">Multiple Episodes</option>
                        </select>
                        <button 
                            className="control" 
                            id="play-button" 
                            title="Run"
                            disabled={this.state.running}
                            onClick={this.handlePlayButtonPress}>▶
                        </button>
                        <button 
                            className="control" 
                            id="reset-button" 
                            title="Reset" 
                            disabled={this.state.running}
                            onClick={this.handleResetButtonPress}>↺
                        </button>
                        <input 
                            className="control"
                            name="stepDelay"
                            id="step-delay-input"
                            title="Delay Between Steps (ms)"
                            onChange={this.handleInputChange}
                            value={this.state.stepDelay}
                            type="number"
                            max="5000"
                            min="100"
                            step="100">
                        </input>
                    </div>
                    {this.createControlsForMode()}
                </div>
            </div>
            <div id="game-container">
                <FrozenLake ref={this.gameRef} />
            </div>
        </div>
    }
}