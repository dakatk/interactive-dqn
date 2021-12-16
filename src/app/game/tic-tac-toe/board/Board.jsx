import React from 'react';
import AsyncComponent from '../../../../util/async-component';
import './board.css';

export default class Board extends AsyncComponent {
    createCells() {
        const divCells = [];
        for (const [i, row] of Object.entries(this.props.cells)) {
            for (const [j, cell] of Object.entries(row)) {
                const index = i * 3 + parseInt(j);
                divCells.push(
                    <div 
                        key={index}
                        id={`board-cell_${index}`} 
                        className="board-cell"
                    >{cell.toString()}
                    </div>
                );
            }
        }
        return divCells;
    }

    render() {
        return <div className="board-play-area">
                {this.createCells()}
            </div>
    }
}