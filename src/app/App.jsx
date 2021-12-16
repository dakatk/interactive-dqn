import React from 'react';
import AsyncComponent from '../util/async-component';
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuModel from './menu.json';
import './app.css';

const appTitleSx = {
    flexGrow: 1,
    textAlign: 'center',
    marginRight: '2.5em'
};

export default class App extends AsyncComponent {
    constructor(props) {
        super(props);
        this.state = {
            mainMenu: null,
            title: 'Welcome'
        }
    }

    /**
     * 
     * @param {*} target 
     */
    async setMainMenu(target) {
        await this.setStateAsync({mainMenu: target})
    }

    /**
     * 
     * @returns 
     */
    menuBar() {
        return <AppBar position="static">
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-haspopup="true"
                    aria-controls="main-menu"
                    sx={{ mr: 2 }}
                    onClick={e => this.setMainMenu(e.currentTarget)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={appTitleSx}>
                    {this.props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    }

    /**
     * 
     * @returns 
     */
    menuItems() {
        const menuItems = [];
        for (const [key, params] of Object.entries(MenuModel)) {
            menuItems.push(<MenuItem
                key={key}
                component={Link}
                onClick={async () => await this.setMainMenu(null)}
                to={params.route}
            > {params.content}
            </MenuItem>);
        }
        return menuItems;
    }

    /**
     * 
     * @returns 
     */
    mainMenu() {
        return <Menu
            id="main-menu"
            open={Boolean(this.state.mainMenu)}
            anchorEl={this.state.mainMenu}
            onClose={async () => await this.setMainMenu(null)}
            disableAutoFocusItem
        > {this.menuItems()}
        </Menu>
    }

    render() {
        return <div>
            {this.menuBar()}
            {this.mainMenu()}

            <Outlet />
        </div>
    }
}
