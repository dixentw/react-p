'use strict';
import React from 'react';
import Dialog from 'material-ui/Dialog';
import $ from 'jquery';
import config from './config.js'

const customContentStyle = {
  width: '100%',
  maxWidth: 'none'
};

var Article = React.createClass({
    render: function() {
        var output = {"__html" : this.props.article.rawData}
        return (
            <Dialog
                open={this.props.open}
                autoScrollBodyContent = {true}
                onRequestClose={this.props.close}
                contentStyle = {customContentStyle}
            >
                <div id="main-container" ondblclick={this.props.close} dangerouslySetInnerHTML={output}/>
            </Dialog>
        );
    }
});

module.exports = Article;
