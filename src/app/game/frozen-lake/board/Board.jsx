import React from 'react';
import AsyncComponent from '../../../../util/async-component';
import Cell from './cell/cell';
import './board.css';

export default class Board extends AsyncComponent {
    /**
     * @returns Array of JSX elements representing the 
     * Frozen Lake's game board
     */
    boardCells() {
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
        return cells;
    }

    render() {
        return <div id="board-grid">
            {this.boardCells()}
        </div>
    }
}