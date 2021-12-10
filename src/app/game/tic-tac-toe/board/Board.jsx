import React from 'react';
import './Board.css';

export default class Board extends React.Component {
    row(index) {
        const row = this.props.cells[index];
        return <tr>
            <td className="board-cell">{row[0]}</td>
            <td className="board-cell">{row[1]}</td>
            <td className="board-cell">{row[2]}</td>
        </tr>
    }

    render() {
        return <table>
            <tbody>
                {this.row(0)}
                {this.row(1)}
                {this.row(2)}
            </tbody>
        </table>
    }
}