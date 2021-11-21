import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app/App';
import FrozenLake from './app/frozen-lake/FrozenLake';
import Game from './app/game/Game';
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
                <Route path="/" element={<App />} />
                <Route exact path="/frozen-lake" element={
                    <Game
                        params={ParamsModel.frozenlake}
                        component={<FrozenLake ref={this.frozenLakeRef}/>}
                    />}
                />
            </Routes>
        </BrowserRouter>
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);
