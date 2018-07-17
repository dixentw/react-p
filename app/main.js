'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { withStyles} from '@material-ui/core/styles'
import { AppBar, IconButton, FontIcon, Toolbar, Typography, Tabs,Tab} from '@material-ui/core';

import {Favorite, Whatshot, Search} from '@material-ui/icons';

// custom component
//import Boards from './boards.js';
//import ArticleList from './alist.js';

const style = the => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: the.palette.background.paper,
  },
});

class Main extends React.Component {
     /*
    getInitialState() {
        return {
            ids : [],
            currentView : "hot", // {"hot", "board", "article"}
            listHeight : 0
        };
    }
    componentDidMount() {
        $.get(config.getUrl() + "/api/hotboard", function(result) {
            if (this.isMounted()) {
                this.setState({"ids" : result});
            }
        }.bind(this));
    }

    handleBackClick(){
        if(this.state.currentView=="article"){
            this.setState({"currentView": "board"});
        }else if(this.state.currentView=="board"){
            this.setState({"currentView": "hot"});
        }
    }

    handleBoardClick(ext){
        this.setState({"currentView" : "board", "boardLink" : ext});
    }

    var mainView, leftIcon;
        if(this.state.currentView=="hot"){
            mainView = <Boards ids={this.state.ids} clickEvt={this.handleBoardClick}/>
            leftIcon = null;
        }else if(this.state.currentView=="board"){
            mainView = <ArticleList link={this.state.boardLink} pc={1} clickEvt={this.handleArticleClick} />
            leftIcon = <IconButton onTouchTap={this.handleBackClick}><FontIcon className="muidocs-icon-action-home" /></IconButton>
        }
    
    */

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Tabs  indicatorColor="primary" textColor="primary" fullWidth>
                        <Tab icon={<Whatshot />} />
                        <Tab icon={<Favorite />} />
                        <Tab icon={<Search />} />
                    </Tabs>
                </AppBar>
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

const A = withStyles(style)(Main) 

ReactDOM.render(< A/>, document.getElementById('mainAAA'));