import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app/App';
import Game from './app/game/Game';
import WelcomePage from './app/welcome-page/WelcomePage';
import FrozenLake from './app/game/frozen-lake/FrozenLake';
import TicTacToe from './app/game/tic-tac-toe/TicTacToe';
import Snake from './app/game/snake/Snake';
import ParamsModel from './models/Params.json';
import './index.css';

class Index extends React.Component {
    constructor(props) {
        super(props);

        this.frozenLakeRef = React.createRef();
        this.ticTacToeRef = React.createRef();
        this.snakeRef = React.createRef();
    }

    childRoutes(homePath) {
        const components = {
            frozenLake: <FrozenLake ref={this.frozenLakeRef} />,
            ticTacToe: <TicTacToe ref={this.ticTacToeRef} />,
            snake: <Snake ref={this.snakeRef} />
        };

        const routes = [];
        for (const [key, params] of Object.entries(ParamsModel)) {
            routes.push(<Route 
                key={key}
                path={homePath + params.url} 
                element={<Game
                    params={params.dqnParams}
                    component={components[key]}
                />}
            />);
        }
        return routes;
    }

    routingTree(homePath, index) {
        return <Route exact path={homePath} element={<App />} key={index}>
            <Route path={homePath} element={<WelcomePage />} />
            {this.childRoutes(homePath)}
        </Route>
    }

    render() {
        return <BrowserRouter>
            <Routes>
                {ParamsModel.parentRoutes.map((path, index) => 
                    this.routingTree(path, index)
                )}
            </Routes>
        </BrowserRouter>
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Index />, rootElement);
