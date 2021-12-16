import React from 'react';
import AsyncComponent from "../util/async-component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './app';
import Game from './game/game';
import HomePage from './home-page/home-page';
import FrozenLake from './game/frozen-lake/frozen-lake';
import TicTacToe from './game/tic-tac-toe/tic-tac-toe';
import Snake from './game/snake/snake';
import RoutingModel from './routing.model.json';

export default class Routing extends AsyncComponent {
    constructor(props) {
        super(props);

        this.state = {
            appTitle: 'Home'
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
     * @param {string} appTitle Title visible at the top of the page
     */
    setAppTitle(appTitle) {
        this.setState({appTitle})
    }

    /**
     * 
     * @param {string} homePath 
     * @returns 
     */
    childRoutes(homePath) {
        const components = {
            frozenLake: this.createTitledElement(FrozenLake, 'Frozen Lake', {ref: this.frozenLakeRef}),
            ticTacToe: this.createTitledElement(TicTacToe, 'Tic-Tac-Toe', {ref: this.ticTacToeRef}),
            snake: this.createTitledElement(Snake, 'Snake', {ref: this.snakeRef})
        };

        const routes = [];
        for (const [key, params] of Object.entries(RoutingModel)) {
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
     * @param {string} homePath 
     * @param {number} index 
     * @returns 
     */
    routingTree(homePath, index) {
        return <Route exact path={homePath} element={<App title={this.state.appTitle}/>} key={index}>
            <Route path={homePath} element={this.createTitledElement(HomePage, 'Home')} />
            {this.childRoutes(homePath)}
        </Route>
    }

    render() {
        return <BrowserRouter>
            <Routes>
                {RoutingModel.parentRoutes.map((path, index) => 
                    this.routingTree(path, index)
                )}
            </Routes>
        </BrowserRouter>
    }
}