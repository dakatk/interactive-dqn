import React from "react";
import './WelcomePage.css';

export default class WelcomePage extends React.Component {
    componentDidMount() {
        this.props.setAppTitle('Welcome');
    }

    render() {
        return <div id="welcome">
            <h1>Welcome!</h1>
        </div>
    }
}