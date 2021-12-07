import AsyncComponent from '../../util/interface/AsyncComponent';
import Controls from '../controls/Controls';
import Counter from '../counter/Counter';
import Trainer from '../../util/rl/Trainer';
import './Game.css';

export default class Game extends AsyncComponent {
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
        const params = this.props.params;
        this.game = this.props.component.ref.current;
        this.trainer = new Trainer(params.bufferSize, params.gamma, params.layers);
    }

    async onPlay(controlState) {
        switch (controlState.mode) {
            case 'step':
                await this.trainer.singleStep(this,
                    controlState.epsilon, 
                    controlState.updateTarget, 
                    controlState.batchSize
                );
                break;

            case 'episode':
                await this.trainer.singleEpisode(this,
                    controlState.maxSteps, 
                    controlState.epsilon, 
                    controlState.batchSize,
                    controlState.stepDelay
                );
                break;

            case 'train':
                await this.trainer.fullyTrain(this,
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

    async onReset() {
        await this.setStateAsync({ 
            currentStep: 0, 
            currentEpisode: 0 
        });
        await this.game.reset();
        this.trainer.reset();
    }

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