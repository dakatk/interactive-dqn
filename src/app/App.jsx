import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

export default class App extends React.Component {
    render() {
        return <div>
            <h1>Games To Learn</h1>
            <nav id="app-nav">
                <Link to="/frozen-lake">Frozen Lake</Link>
            </nav>
            <Outlet />
        </div>
    }
}