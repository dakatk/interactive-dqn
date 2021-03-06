import GameComponent from '../interface/game-component';
import GameLogic from './util/game-logic';
// import bestMove from './util/minimax';
import Board from './board/board';
import * as tf from '@tensorflow/tfjs';
import './tic-tac-toe.css';

export default class TicTacToe extends GameComponent {
    constructor(props) {
        super(props);
        
        this.game = new GameLogic();
        this.state = {
            cells: this.game.board
        };
    }

    async reset() {
        await this.setStateAsync({ 
            cells: this.game.reset() 
        });
    }

    allowedActions() {
        return this.game.legalMoves().map(move => move[0] * 3 + move[1]);
    }

    async step(action) {
        console.log(action);
        // First turn: Minimax (as X's, will be variable later)
        // Second turn: Dqn
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