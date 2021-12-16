import React from 'react';
import AsyncComponent from '../../../../util/async-component';
import './board.css';

export default class Board extends AsyncComponent {
    createCells() {
        const divCells = [];
        for (const [i, row] of Object.entries(this.props.cells)) {
            for (const [j, cell] of Object.entries(row)) {
                const index = i * 3 + parseInt(j);
                divCells.push(<div id={`block_${index}`} class="block">{cell}</div>);
            }
        }
        return divCells;
    }

    render() {
        return <div class="container">
            <div class="play-area">
                {this.createCells()}
            </div>
        </div>
    }
}