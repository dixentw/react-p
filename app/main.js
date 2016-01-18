/* main.js */

'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import LightRawTheme from 'material-ui/lib/styles/raw-themes/light-raw-theme';
import Colors from 'material-ui/lib/styles/colors';
import AppBar from 'material-ui/lib/app-bar'
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';

import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Menu from 'material-ui/lib/menus/menu';

import injectTapEventPlugin from 'react-tap-event-plugin/src/injectTapEventPlugin';
injectTapEventPlugin();


var dataa = require('./lalala.js');
var MyCard = require('./card.js');
var $ = require('jquery');

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
                    showMenuIconButton = {false}
                    iconElementRight={
                      <IconMenu iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}>
                        <MenuItem primaryText="Latest" />
                        <MenuItem primaryText="Hottest" />
                      </IconMenu>
                    }
                />
                <MyCard ids={this.state.ids} />
            </div>
        );
    }
});

ReactDOM.render(<Main />, document.getElementById('main'));
