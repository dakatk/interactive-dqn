/*eslint eqeqeq: "off"*/

import React from 'react';
import './FrozenLake.css';
import { Action, Transition } from './util/Step.js'
import * as tf from '@tensorflow/tfjs';
import styleData from './models/StyleData.json';

export default class FrozenLake extends React.Component {
    board = Object.freeze([
        'S', 'F', 'F', 'F',
        'F', 'H', 'F', 'H',
        'F', 'F', 'F', 'H',
        'H', 'F', 'F', 'G'
    ]);

    constructor(props) {
        super(props);

        this.state = { location: 0 };
        this.prevAction = Action.RIGHT; 
    }

    componentDidMount() {}
    componentWillUnmount() {}

    reset() {
        this.setState({ location: 0 });
        this.prevAction = Action.RIGHT
    }

    allowedActions() {
        let opposite = this.prevAction.opposite();
        let location = this.state.location;
        let stateX = location % 4;
        let stateY = Math.floor(location / 4);

        let allowedActions = [];

        if (stateX > 0 && opposite !== Action.LEFT) {
            allowedActions.push(Action.LEFT);
        }
        if (stateX < 3 && opposite !== Action.RIGHT) {
            allowedActions.push(Action.RIGHT);
        }
        if (stateY > 0 && opposite !== Action.UP) {
            allowedActions.push(Action.UP);
        }
        if (stateY < 3 && opposite !== Action.DOWN) {
            allowedActions.push(Action.DOWN);
        }
        return allowedActions;
    }

    async step(action) {
        let prevState = this.stateAsTensor();
        let allowedActions = this.allowedActions();

        if (!allowedActions.includes(action)) {
            return new Transition(action, prevState, -1, true, prevState, allowedActions);
        }
        let location = this.state.location;
        let stateX = location % 4;
        let stateY = Math.floor(location / 4);

        switch (action) {
            case Action.UP:
                stateY --;
                break;

            case Action.DOWN:
                stateY ++;
                break;

            case Action.LEFT:
                stateX --;
                break;

            case Action.RIGHT:
                stateX ++;
                break;
            
            default:
                break;
        }
        await this.setState({ location: stateY * 4 + stateX });
        this.prevAction = action;

        return new Transition(action, prevState, this.reward(), this.done(), this.stateAsTensor(), allowedActions);
    }

    reward() {
        let location = this.state.location;
        switch (this.board[location]) {
            case 'G':
                return 1;
            case 'H':
                return -1;
            case 'F':
            case 'S':
            default:
                return 0;
        }
    }

    done() {
        let location = this.state.location;
        let cell = this.board[location];
        return cell === 'G' || cell === 'H';
    }

    stateAsTensor() {
        let oneHot = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        let location = this.state.location;
        oneHot[location] = 1;
        
        return tf.tensor2d([oneHot]);
    }

    render() {
        let cells = [];
        for (const i in this.board) {
            const cell = this.board[i];
            const className = styleData.classes[cell] + " grid-item";
            const title = styleData.titles[cell];

            let content;
            if (i == this.state.location) {
                content = '웃';
            }
            else {
                content = cell;
            }

            cells.push(<div className={className} title={title} key={i}>{content}</div>);
            if ((parseInt(i) + 1) % 4 === 0) {
                cells.push(<br key={i + '-br'} />)
            }
        }
        return <div id="frozen-lake-grid">
            {cells}
        </div>
    }
}