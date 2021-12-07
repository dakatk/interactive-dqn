import GameComponent from '../interface/GameComponent';
import './TicTacToe.css';

export default class TicTacToe extends GameComponent {
    render() {
        return <div id="tic-tac-toe">
            <h1>TicTacToe</h1>
        </div>
    }
}