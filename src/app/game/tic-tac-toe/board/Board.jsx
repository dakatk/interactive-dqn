import React from 'react';
import AsyncComponent from '../../../../util/async-component';
import './board.css';

export default class Board extends AsyncComponent {
    createCells() {
        const divCells = [];
        for (const [i, row] of Object.entries(this.props.cells)) {
            for (const [j, cell] of Object.entries(row)) {
                const index = i * 3 + parseInt(j);
                divCells.push(<div id={`board-cell-${index}`} class="board-cell">{cell}</div>);
            }
        }
        return divCells;
    }

    render() {
        return <div id="board-grid">
                {this.createCells()}
            </div>
    }
}