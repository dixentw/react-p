/* main.js */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';


var dataa = require('./lalala.js');
var MyCard = require('./card.js');
var $ = require('jquery');

var Main2 = React.createClass({
    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },
    getInitialState: function() {
        return {
            ids :  [],
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
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
        $.get("https://hacker-news.firebaseio.com/v0/newstories.json", function(result) {
            if (this.isMounted()) {
                this.setState({"ids" : result});
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <AppBar
                    title="HackerNews"
                    iconElementRight={
                        <IconMenu iconButtonElement={
                            <IconButton><MoreVertIcon /></IconButton>
                        }>
                            <MenuItem primaryText="Refresh" />
                            <MenuItem primaryText="Help" />
                            <MenuItem primaryText="Sign out" />
                        </IconMenu>
                    }
                />
                <MyCard ids={this.state.ids} />
            </div>
        );
    }
});

ReactDOM.render(<Main2 />, document.getElementById('mainAAA'));
