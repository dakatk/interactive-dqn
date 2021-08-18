import React from 'react';
import './App.css';
import FrozenLake from './game/FrozenLake';
import Dqn from './game/util/rl/Dqn';
import controls from './models/Controls.json';
import params from './models/Params.json';
import sleep from './util/Sleep';

export default class App extends React.Component {
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
            running: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handlePlayButtonPress = this.handlePlayButtonPress.bind(this);
        this.handleResetButtonPress = this.handleResetButtonPress.bind(this);
    }

    componentDidMount() {
        this.game = this.gameRef.current;
        this.dqn = new Dqn(params.bufferSize, params.gamma);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({ [name]: value });
    }

    async handlePlayButtonPress() {
        const epsilon = this.state.epsilon;
        const updateTarget = this.state.updateTarget;
        const maxSteps = this.state.maxSteps;
        const episodes = this.state.episodes;
        const batchSize = this.state.batchSize;
        const epsilonMax = this.state.epsilonMax;
        const epsilonMin = this.state.epsilonMin;

        await this.setState({ running: true });

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
        await this.setState({ running: false });
    }

    async fullyTrain(episodes, maxSteps, batchSize, epsilonMax, epsilonMin) {
        const epsDecay = (epsilonMax - epsilonMin) / episodes;
        let epsilon = epsilonMax;

        for (let episode = 0; episode < episodes && this.state.running; episode ++) {
            await this.singleEpisode(maxSteps, epsilon, batchSize);

            if (epsilon > epsilonMin) {
                epsilon = (epsilonMax - epsilonMin) * Math.exp(-epsDecay * episode) + epsilonMin;
            }
        }
    }

    async singleEpisode(maxSteps, epsilon, batchSize) {
        for (let i = 0; i < maxSteps && this.state.running; i ++) {
            const transition = await this.dqn.step(this.game, epsilon);

            await sleep(1000);
            this.forceUpdate();

            if (transition.done) {
                break;
            }
        }
        this.game.reset();
        await this.dqn.trainModel(batchSize);
        this.dqn.updateTargetModel();
    }

    async singleStep(epsilon, updateTarget, batchSize) {
        const step = await this.dqn.step(this.game, epsilon);

        if (step.done) {
            this.game.reset();
            await this.dqn.trainModel(batchSize);
        }

        if (updateTarget) {
            this.dqn.updateTargetModel();
        }
    }

    handleResetButtonPress() {
        this.game.reset();
        this.dqn.reset();
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
                key={labelFor + "-label"}>{labelText + ':'} 
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

    render() {
        return <div>
            <div id="controls-container">
                <div id="controls-box">
                    <div id="static-controls">
                        <select className="control" id="mode-select" name="mode" title="Mode select" 
                            onChange={this.handleInputChange} defaultValue="step">
                            <option value="step">Single Step</option>
                            <option value="episode">Single Episode</option>
                            <option value="train">Full Training</option>
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