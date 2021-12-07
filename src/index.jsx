import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app/App';
import Game from './app/game/Game';
import WelcomePage from './app/welcome-page/WelcomePage';
import FrozenLake from './app/game/frozen-lake/FrozenLake';
import TicTacToe from './app/game/tic-tac-toe/TicTacToe';
import ParamsModel from './models/Params.json';
import './index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.parentRoutes = ["/", "/app/", "/interactive-dqn/"];

        this.frozenLakeRef = React.createRef();
        this.ticTacToeRef = React.createRef();
    }

    routingTree(homePath, index) {
        return <Route exact path={homePath} element={<App />} key={index}>
            <Route path={homePath} element={<WelcomePage />} />
            <Route path={homePath + '/frozen-lake'} element={
                <Game
                    params={ParamsModel.frozenLake}
                    component={<FrozenLake ref={this.frozenLakeRef}/>}
                />}
            />
            <Route path={homePath + '/tic-tac-toe'} element={
                <Game
                    params={ParamsModel.ticTacToe}
                    component={<TicTacToe ref={this.ticTacToeRef}/>}
                />}
            />
        </Route>
    }

    render() {
        return <BrowserRouter>
            <Routes>
                {this.parentRoutes.map((path, index) => 
                    this.routingTree(path, index)
                )}
            </Routes>
        </BrowserRouter>
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Index />, rootElement);
