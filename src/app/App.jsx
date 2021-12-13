import React from 'react';
import AsyncComponent from '../util/AsyncComponent';
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuModel from './Menu.json';
import './App.css';

const appTitle = {
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

    async setMainMenu(target) {
        await this.setStateAsync({mainMenu: target})
    }

    async setTitle(title) {
        await this.setStateAsync({title});
    }

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
                <Typography variant="h5" component="div" sx={appTitle}>
                    {this.state.title}
                </Typography>
            </Toolbar>
        </AppBar>
    }

    menuItems() {
        const menuItems = [];
        for (const [key, params] of Object.entries(MenuModel)) {
            menuItems.push(<MenuItem
                key={key}
                component={Link}
                onClick={async () => {
                    await this.setMainMenu(null);
                    await this.setTitle(params.title);
                }}
                to={params.route}
            > {params.content}
            </MenuItem>);
        }
        return menuItems;
    }

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
