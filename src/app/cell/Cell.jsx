import React from 'react';
import StylesModel from './models/Styles.json';
import './Cell.css';

export default class Cell extends React.Component {
    render() {
        const type = this.props.type;
        const className = [StylesModel.classes[type] || '', 'grid-item'].join(' ');
        const tooltip = StylesModel.titles[type];
        const content = (this.props.populated && '웃') || type;

        return <div className={className} title={tooltip}>{content}</div>
    }
}