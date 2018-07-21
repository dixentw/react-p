'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { withStyles} from '@material-ui/core/styles'
import { AppBar, IconButton, Menu,
    Toolbar, Typography, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {Favorite, Whatshot, Search} from '@material-ui/icons';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";

// custom component
import Boards from './boards.js';
import ArticleList from './alist.js';
import Article from './article.js';

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
    handleClose () {
        this.setState({ anchor: null });
    }

    render() {
        const { classes } = this.props;
        const { anchor } = this.state;
        const open = Boolean(anchor);
        return (
            <HashRouter>
            <div className={classes.root} onScroll={this.handleScroll}>
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
                            <MenuItem ><NavLink to="/board/hot">熱門看板</NavLink></MenuItem>
                            <MenuItem ><NavLink to="/board/favorite">我的最愛</NavLink></MenuItem>
                            <MenuItem ><NavLink to="/search">搜尋看板</NavLink></MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Route path="/board/:from" component={Boards}/>
                <Route path="/search" component={Boards}/>
                <Route path="/alist/:url" component={ArticleList}/>
                <Route path="/article/:url" component={Article}/>
            </div>
            </HashRouter> 
        );
    }
}
//<Boards board={currTab} />

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

const A = withStyles(style)(Main) 

ReactDOM.render(< A/>, document.getElementById('app'));
