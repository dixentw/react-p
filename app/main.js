'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import DarkRawTheme from 'material-ui/lib/styles/raw-themes/dark-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import BackArrow from 'material-ui/lib/svg-icons/navigation/arrow-back'
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import FlatButton from 'material-ui/lib/flat-button';
import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();
import $ from 'jquery';

// custom component
import Boards from './boards.js';
import ArticleList from './alist.js'
import Article from './article.js'

const style = {
  marginRight: 32,
  marginBottom: 32,
  float: 'left',
  position: 'relative',
  zIndex: 0,
};

var Main = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getInitialState: function() {
        return {
            muiTheme: ThemeManager.getMuiTheme(DarkRawTheme),
            ids : [],
            currentView : "hot" // {"hot", "board", "article"}
        };
    },
    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },
    componentWillMount() {
        let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
            accent1Color: Colors.deepOrange500,
        });
        this.setState({muiTheme: newMuiTheme});
    },
    componentDidMount: function() {
        $.get("http://130.211.249.49:8080/api/hotboard", function(result) {
            if (this.isMounted()) {
                this.setState({"ids" : result});
            }
        }.bind(this));
    },
    handleBackClick : function(){
        if(this.state.currentView=="article"){
            this.setState({"currentView": "board"});
        }else if(this.state.currentView=="board"){
            console.log("shold be here");
            this.setState({"currentView": "hot"});
        }
    },
    handleBoardClick : function(ext){
        this.setState({"currentView" : "board", "boardLink" : ext});
    },
    handleArticleClick : function(ext){
        this.setState({"currentView" : "article", "articleLink" : ext});
    },
    render: function() {
        var mainView, leftIcon;
        if(this.state.currentView=="hot"){
            mainView = <Boards ids={this.state.ids} clickEvt={this.handleBoardClick}/>
            leftIcon = null;
        }else if(this.state.currentView=="board"){
            mainView = <ArticleList link={this.state.boardLink} clickEvt={this.handleArticleClick} />
            leftIcon = <IconButton onTouchTap={this.handleBackClick}><BackArrow /></IconButton>
        }else if(this.state.currentView=="article"){
            mainView = <Article link={this.state.articleLink} />
            leftIcon = <IconButton onTouchTap={this.handleBackClick}><BackArrow /></IconButton>
        }
        return (
            <div>
                <AppBar
                    iconElementLeft={leftIcon}
                    title="PTT browser"
                    showMenuIconButton={leftIcon!=null}
                />
                {mainView}
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('main'));
