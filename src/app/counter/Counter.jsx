import React from 'react';
import './Counter.css';

export default class Counter extends React.Component {
    showCurrentStep() {
        const mode = this.props.mode;
        if (mode === 'episode' || mode === 'train') {
            return <h3 id="counter-step">Step: {this.props.step}</h3>
        }
    }

    showCurrentEpisode() {
        if (this.props.mode === 'train') {
            return <h3 id="counter-episode">Episode: {this.props.episode}</h3>
        }
    }

    render() {
        return <div style={{clear: 'both'}} id="counter-counts">
            {this.showCurrentStep()}
            {this.showCurrentEpisode()}
        </div>
    }
}