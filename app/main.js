'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {lightBaseTheme, MuiThemeProvider, getMuiTheme} from 'material-ui/styles';
import {AppBar, IconButton, FontIcon} from 'material-ui';
import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();
import $ from 'jquery';
// custom component
import Boards from './boards.js';
import ArticleList from './alist.js';
import Article from './article.js';
import config from './config.js';

var Main = React.createClass({
    pageCount : 1,
    getInitialState: function() {
        return {
            ids : [],
            currentView : "hot", // {"hot", "board", "article"}
            listHeight : 0
        };
    },
    componentDidMount: function() {
        $.get(config.getUrl() + "/api/hotboard", function(result) {
            if (this.isMounted()) {
                this.setState({"ids" : result});
            }
        }.bind(this));
    },
    handleBackClick : function(){
        if(this.state.currentView=="article"){
            this.setState({"currentView": "board"});
        }else if(this.state.currentView=="board"){
            this.setState({"currentView": "hot"});
        }
    },
    handleBoardClick : function(ext){
        this.setState({"currentView" : "board", "boardLink" : ext});
    },
    render: function() {
        var mainView, leftIcon;
        if(this.state.currentView=="hot"){
            mainView = <Boards ids={this.state.ids} clickEvt={this.handleBoardClick}/>
            leftIcon = null;
        }else if(this.state.currentView=="board"){
            mainView = <ArticleList link={this.state.boardLink} pc={1} clickEvt={this.handleArticleClick} />
            leftIcon = <IconButton onTouchTap={this.handleBackClick}><FontIcon className="muidocs-icon-action-home" /></IconButton>
        }
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
            <div>
                <AppBar
                    iconElementLeft={leftIcon}
                    title="PTT browser"
                    showMenuIconButton={leftIcon!=null}
                />
                {mainView}
            </div>
            </MuiThemeProvider>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('mainAAA'));
