import React from 'react';
import AsyncComponent from '../../../../../util/async-component';
import CellModel from './cell.model.json';
import './cell.css';

export default class Cell extends AsyncComponent {
    render() {
        const type = this.props.type;
        const className = [CellModel.classes[type] || '', 'cell-grid-item'].join(' ');
        const tooltip = CellModel.titles[type];
        const content = (this.props.populated && '웃') || type;

        return <div className={className} title={tooltip}>{content}</div>
    }
}