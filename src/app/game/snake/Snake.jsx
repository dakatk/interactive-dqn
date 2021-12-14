import GameComponent from '../interface/GameComponent';
import './Snake.css';

export default class Snake extends GameComponent {
    constructor(props) {
        super(props, 'Snake');
    }
    
    render() {
        return <div id="snake">
            <h1>Snake</h1>
        </div>
    }
}