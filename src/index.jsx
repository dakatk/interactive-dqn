import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app/App';
import Game from './app/game/Game';
import FrozenLake from './app/game/frozen-lake/FrozenLake';
import ParamsModel from './models/Params.json';
import './index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.frozenLakeRef = React.createRef();
    }

    render() {
        return <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<App />} />
                <Route exact path="/interactive-dqn" element={<App />} />
                <Route exact path="/frozen-lake" element={
                    <Game
                        params={ParamsModel.frozenLake}
                        component={<FrozenLake ref={this.frozenLakeRef}/>}
                    />}
                />
            </Routes>
        </BrowserRouter>
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
