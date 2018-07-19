'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { withStyles} from '@material-ui/core/styles'
import { AppBar, IconButton, Menu,
    Toolbar, Typography, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {Favorite, Whatshot, Search} from '@material-ui/icons';

// custom component
import Boards from './boards.js';
//import ArticleList from './alist.js';

const style = the => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currTab: 'hot',
            anchor: null,
        };
    }
    handleMenu (event) {
        this.setState({ anchor: event.currentTarget });
    }
    handleClose (event) {
        this.setState({ anchor: null });
    }

    render() {
        const { classes } = this.props;
        const {currTab, anchor} = this.state;
        const open = Boolean(anchor);
        return (
            <div className={classes.root}>
                <AppBar position='static' color='default'>
                    <Toolbar>
                        <IconButton color="inherit" aria-label="Menu" onClick={this.handleMenu.bind(this)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.flex}>
                            PTT 瀏覽器
                        </Typography>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchor}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={open}
                            onClose={this.handleClose.bind(this)}
                            >
                            <MenuItem onClick={this.handleClose.bind(this)}>熱門看板</MenuItem>
                            <MenuItem onClick={this.handleClose.bind(this)}>我的最愛</MenuItem>
                            <MenuItem onClick={this.handleClose.bind(this)}>搜尋看板</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Boards board={currTab} />
            </div>
        );
    }
}


Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

const A = withStyles(style)(Main) 

ReactDOM.render(< A/>, document.getElementById('app'));
