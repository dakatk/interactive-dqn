import React from 'react';
import * as tf from '@tensorflow/tfjs';
import Action from './util/Action';
import Transition from '../../../util/rl/Transition';
import GameComponent from '../interface/GameComponent';
import Board from './board/Board';
import './FrozenLake.css';

export default class FrozenLake extends GameComponent {
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

    async reset() {
        await this.setStateAsync({ location: 0 });
        this.prevAction = Action.RIGHT
    }

    allowedActions() {
        const opposite = this.prevAction.opposite();
        const location = this.state.location;
        
        const stateX = location % 4;
        const stateY = Math.floor(location / 4);

        const allowedActions = [];

        if (stateX > 0 && opposite !== Action.LEFT) {
            allowedActions.push(Action.LEFT.enumOrdinal);
        }
        if (stateX < 3 && opposite !== Action.RIGHT) {
            allowedActions.push(Action.RIGHT.enumOrdinal);
        }
        if (stateY > 0 && opposite !== Action.UP) {
            allowedActions.push(Action.UP.enumOrdinal);
        }
        if (stateY < 3 && opposite !== Action.DOWN) {
            allowedActions.push(Action.DOWN.enumOrdinal);
        }
        return allowedActions;
    }

    async step(actionOrdinal) {
        const action = Action.fromOrdinal(actionOrdinal);
        const prevState = this.stateAsTensor();
        const allowedActions = this.allowedActions();

        if (!allowedActions.includes(actionOrdinal)) {
            return new Transition(action, prevState, -1, true, prevState, allowedActions);
        }
        const location = this.state.location;
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
        await this.setStateAsync({ location: stateY * 4 + stateX });
        this.prevAction = action;

        return new Transition(action, prevState, this.reward(), this.done(), this.stateAsTensor(), allowedActions);
    }

    reward() {
        const location = this.state.location;
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
        const location = this.state.location;
        const cell = this.board[location];
        return cell === 'G' || cell === 'H';
    }

    stateAsTensor() {
        const oneHot = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0
        ];
        const location = this.state.location;
        oneHot[location] = 1;
        
        return tf.tensor2d([oneHot]);
    }

    render() {
        return <Board boardData={this.board} location={this.state.location} rowSize={4} />
    }
}