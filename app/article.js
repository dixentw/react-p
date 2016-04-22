'use strict';
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import $ from 'jquery';
import config from './config.js'

var Article = React.createClass({
    getInitialState: function() {
        return {
            article : {},
            mmodal : false
        };
    },
    componentDidMount : function(){
        console.log(this.state);
        $.get(config.getUrl() +'/api/article/' + encodeURIComponent(this.props.link), function(result) {
            if (this.isMounted()) {
                this.setState({"article" : result});
            }
        }.bind(this));
    },
    render: function() {
        var output = {"__html" : this.state.article.rawData}
        return (
            <Dialog
                title="Dialog With Actions"
                open={this.props.open}
                onRequestClose={this.props.close}
            >
                fkowefkowkfowek
                fwkoefkw
                wkefowe
                kwofe
                <div id="main-container" ondblclick={this.props.close} dangerouslySetInnerHTML={output}/>
            </Dialog>

        );
    }
});

module.exports = Article;
