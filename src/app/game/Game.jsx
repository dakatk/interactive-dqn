import TrainingComponent from './util/training-component';
import Controls from '../controls/controls';
import Counter from '../counter/counter';
import './game.css';

export default class Game extends TrainingComponent {
    constructor(props) {
        super(props);

        this.state = { 
            currentStep: 0, 
            currentEpisode: 0, 
            controlMode: 'step' 
        };
        this.onPlay = this.onPlay.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onModeSelect = this.onModeSelect.bind(this);
    }

    componentDidMount() {
        const gameComponent = this.props.component;
        this.game = gameComponent.ref.current;
    }

    /**
     * 
     * @param {*} controlState 
     */
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
                break;

            default:
                break;
        }
    }

    /**
     * 
     */
    async onReset() {
        await this.setStateAsync({ 
            currentStep: 0, 
            currentEpisode: 0 
        });
        await this.game.reset();
        this.reset();
    }

    /**
     * 
     * @param {*} mode 
     */
    async onModeSelect(mode) {
        await this.setStateAsync({ 
            currentStep: 0, 
            currentEpisode: 0,
            controlMode: mode
        });
        await this.game.reset();
    }

    render() {
        return <div>
            <div id="game-controls-container">
                <Controls 
                    onPlay={this.onPlay} 
                    onReset={this.onReset} 
                    onModeSelect={this.onModeSelect}
                />
            </div>
            <div id="game-container">
                {this.props.component}
            </div>
            <div id="game-counter-container">
                <Counter 
                    mode={this.state.controlMode} 
                    step={this.state.currentStep} 
                    episode={this.state.currentEpisode} 
                />
            </div>
        </div>
    }
}