'use strict';
import React from 'react';
import Paper from 'material-ui/lib/paper';
import $ from 'jquery';

var Article = React.createClass({
    getInitialState: function() {
        return {
            article : {}
        };
    },
    componentDidMount : function(){
        $.get("http://130.211.249.49:8080/api/article/" + encodeURIComponent(this.props.link), function(result) {
            if (this.isMounted()) {
                this.setState({"article" : result});
            }
        }.bind(this));
    },
    handleDClick : function(){
        console.log("on double click");
    },
    render: function() {
        var output = {"__html" : this.state.article.rawData}
        return (
            <div id="main-container" ondblclick={this.handleDClick} dangerouslySetInnerHTML={output}/>
        );
    }
});

module.exports = Article;
