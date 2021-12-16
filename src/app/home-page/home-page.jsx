import React from "react";
import AsyncComponent from "../../util/async-component";
import './home-page.css';

export default class HomePage extends AsyncComponent {
    render() {
        return <div id="welcome">
            <h1>Welcome!</h1>
        </div>
    }
}