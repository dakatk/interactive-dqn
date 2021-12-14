import React from "react";
import AsyncComponent from "../../util/AsyncComponent";
import ControlsModel from './models/Controls.json';
import './Controls.css';

export default class Controls extends AsyncComponent {
    constructor(props) {
        super(props);
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
            stepDelay: 500
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleModeSelectChange = this.handleModeSelectChange.bind(this);
        this.handlePlayButtonPress = this.handlePlayButtonPress.bind(this);
        this.handleResetButtonPress = this.handleResetButtonPress.bind(this);
    }

    /**
     * @param {Event} e 
     */
    async handleInputChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        await this.setStateAsync({ [name]: value });
    }

    async handleModeSelectChange(e) {
        await this.handleInputChange(e);
        await this.props.onModeSelect(this.state.mode);
    }

    async handlePlayButtonPress() {
        await this.setStateAsync({ running: true });
        await this.props.onPlay(Object.freeze({...this.state}));
        await this.setStateAsync({ running: false });
    }

    async handleResetButtonPress() {
        await this.setStateAsync({ 
            running: false, 
            currentStep: 0, 
            currentEpisode: 0 
        });
        await this.props.onReset();
    }

    createControlsForMode() {
        const controlsElements = [];
        for (const el of ControlsModel[this.state.mode]) {
            const props = el.props;
            const label = el.label;
            const name = props.name;
            const tooltip = props.title;

            controlsElements.push(this.createLabel(label, name, tooltip));
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
            id={`${labelFor}-label`} 
            key={`${labelFor}-label`}>{`${labelText}:`}&nbsp;
        </label>
    }

    createInput(props) {
        const name = props.name;
        const className = "control labeled";
        const onChange = this.handleInputChange;
        const value = this.state[name];
        const key = name + '-input';

        const elementProps = {
            ...props, 
            className,
            onChange,
            value,
            key
        };
        return React.createElement('input', elementProps);
    }

    render() {
        return <div id="controls-box">
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
                <label
                    className="control"
                    htmlFor="stepDelay"
                    id="step-delay-label"
                    title="Delay between steps (ms)">Delay:&nbsp;
                </label>
                <input 
                    className="control labeled"
                    name="stepDelay"
                    id="stepDelay"
                    title="Delay between steps (ms)"
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
    }
}