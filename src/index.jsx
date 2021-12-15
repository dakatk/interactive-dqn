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

        this.state = {
            appTitle: 'Welcome'
        };
        this.frozenLakeRef = React.createRef();
        this.ticTacToeRef = React.createRef();
        this.snakeRef = React.createRef();
    }

    /**
     * 
     * @param {class} component
     * @param {string} title
     * @param {*} otherProps 
     * @returns 
     */
    createTitledElement(component, title, otherProps) {
        component.prototype.componentDidMount = function() {
            this.props.setAppTitle();
        }
        return React.createElement(component, {
            ...(otherProps || {}),
            setAppTitle: () => this.setAppTitle(title)
        });
    }

    /**
     * 
     * @param {string} appTitle 
     */
    setAppTitle(appTitle) {
        this.setState({appTitle})
    }

    /**
     * 
     * @param {*} homePath 
     * @returns 
     */
    childRoutes(homePath) {
        const components = {
            frozenLake: this.createTitledElement(FrozenLake, 'Frozen Lake', {ref: this.frozenLakeRef}),
            ticTacToe: this.createTitledElement(TicTacToe, 'Tic-Tac-Toe', {ref: this.ticTacToeRef}),
            snake: this.createTitledElement(Snake, 'Snake', {ref: this.snakeRef})
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

    /**
     * 
     * @param {*} homePath 
     * @param {*} index 
     * @returns 
     */
    routingTree(homePath, index) {
        return <Route exact path={homePath} element={<App title={this.state.appTitle}/>} key={index}>
            <Route path={homePath} element={this.createTitledElement(WelcomePage, 'Welcome')} />
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
