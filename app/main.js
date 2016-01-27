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

var Main2 = React.createClass({
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
    handleClick : function(){
        this.setState({"currentView": "board"});
    },
    handleBoardClick : function(ext){
        console.log("hit handleBoardClick !!!" + ext);
    },
    handleArticleClick : function(ext){
        console.log("hit handleArticleClick !!!" + ext);
    },
    render: function() {
        var mainView, leftIcon;
        if(this.state.currentView=="hot"){
            mainView = <Boards ids={this.state.ids} clickEvt={this.handleBoardClick}/>
            leftIcon = null;
        }else{
            mainView = <ArticleList link="/bbs/Gossiping/index.html" clickEvt={this.handleArticleClick} />
            leftIcon = <IconButton><BackArrow /></IconButton>
        }
        return (
            <div>
                <AppBar
                    iconElementLeft={leftIcon}
                    title="PTT browser"
                    showMenuIconButton={leftIcon!=null}
                />
                <FlatButton label="test toggle" primary={true} onTouchTap={this.handleClick}/>
                {mainView}
            </div>
        );
    }
});

ReactDOM.render(<Main2 />, document.getElementById('mainAAA'));
