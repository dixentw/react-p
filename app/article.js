'use strict';
import React from 'react';
import Paper from 'material-ui/lib/paper';
import $ from 'jquery';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

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
    render: function() {
        var output = {"__html" : this.state.article.rawData}
        return (
            <div dangerouslySetInnerHTML={output} />
        );
    }
});

module.exports = Article;
