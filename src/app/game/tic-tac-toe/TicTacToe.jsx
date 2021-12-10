import GameComponent from '../interface/GameComponent';
import GameLogic from './util/GameLogic';
import Board from './board/Board';
import * as tf from '@tensorflow/tfjs';
import './TicTacToe.css';

export default class TicTacToe extends GameComponent {
    constructor(props) {
        super(props);

        this.game = new GameLogic();
        this.state = {
            cells: this.game.board
        };
    }

    async reset() {
        this.game.reset();
        await this.setStateAsync({ cells: this.game.board });
    }

    allowedActions() {
        return this.game.legalMoves().map(move => move[0] * 3 + move[1]);
    }

    async step(action) {
        console.log(action);
    }

    stateAsTensor() {
        const flattened = this.game.board[0]
            .concat(this.game.board[1])
            .concat(this.game.board[2]);

            const numericValues = {
                ' ': 0,
                'X': 1,
                'O': 2
            };
            return tf.tensor2d([
                flattened.map(value => numericValues[value])
            ]);
    }

    render() {
        return <Board cells={this.state.cells}></Board>
    }
}