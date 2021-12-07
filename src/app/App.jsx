import React from 'react';
import AsyncComponent from '../util/AsyncComponent';
import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Menu, MenuItem, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import './App.css';

const appTitle = {
    flexGrow: 1,
    textAlign: 'center'
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
                <Typography variant="h6" component="div" sx={appTitle}>
                    {this.state.title}
                </Typography>
            </Toolbar>
        </AppBar>
    }

    mainMenu() {
        return <Menu
            id="main-menu"
            open={Boolean(this.state.mainMenu)}
            anchorEl={this.state.mainMenu}
            onClose={async () => await this.setMainMenu(null)}
            disableAutoFocusItem
        >
            <MenuItem
                component={Link}
                onClick={async () => {
                    await this.setMainMenu(null);
                    await this.setTitle('Welcome');
                }}
                to="/"
            > Home
            </MenuItem>
            <MenuItem
                component={Link}
                onClick={async () => {
                    await this.setMainMenu(null);
                    await this.setTitle('Frozen Lake');
                }}
                to="/frozen-lake"
            > Frozen Lake
            </MenuItem>
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