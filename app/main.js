'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import {lightBaseTheme, MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles'
import {AppBar, IconButton, FontIcon, Toolbar, Typography} from '@material-ui/core';
// custom component
//import Boards from './boards.js';
//import ArticleList from './alist.js';
  
const theme = createMuiTheme({});

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
        const classes = {
            flex: {flexGrow: 1}
        }
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="title" color="inherit">PTT browser</Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        );
    }
}

ReactDOM.render(<Main />, document.getElementById('mainAAA'));