import React from 'react';
import AsyncComponent from '../../util/async-component';
import './counter.css';

export default class Counter extends AsyncComponent {
    /**
     * @returns JSX element displaying the value 
     * of the current step in the current episode
     */
    showCurrentStep() {
        const mode = this.props.mode;
        if (mode === 'episode' || mode === 'train') {
            return <h3 id="counter-step">Step: {this.props.step}</h3>
        }
    }

    /**
     * @returns JSX element displaying the value 
     * of the current episode
     */
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