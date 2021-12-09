import React from 'react';
import Cell from './cell/Cell';
import './Board.css';

export default class Board extends React.Component {
    render() {
        const cells = [];
        for (const i in this.props.boardData) {
            const type = this.props.boardData[i];
            const index = parseInt(i);
            const populated = index  === this.props.location;
            
            cells.push(<Cell type={type} populated={populated} key={i} />);
            if ((index + 1) % this.props.rowSize === 0) {
                cells.push(<br key={`${i}-br`} />)
            }
        }
        return <div id="board-grid">
            {cells}
        </div>
    }
}