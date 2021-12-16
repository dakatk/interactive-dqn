import GameComponent from '../interface/game-component';
import './snake.css';

export default class Snake extends GameComponent {    
    render() {
        return <div id="snake">
            <h1>Snake</h1>
        </div>
    }
}