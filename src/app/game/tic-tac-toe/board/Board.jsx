import React from 'react';
import './Board.css';

export default class Board extends React.Component {
    /**
     * Display a single row
     * @param {number} index 
     * @returns 
     */
    row(index) {
        const row = this.props.cells[index];
        return <tr>
            <td className="board-cell">{row[0]}</td>
            <td className="board-cell">{row[1]}</td>
            <td className="board-cell">{row[2]}</td>
        </tr>
    }

    render() {
        return <div style={{margin: 'auto'}}>
            <table>
                <tbody>
                    {this.row(0)}
                    {this.row(1)}
                    {this.row(2)}
                </tbody>
            </table>
        </div>
    }
}