import React from 'react';

import $ from 'jquery';

var Article = React.createClass({
    getInitialState: function() {
        return {
            articles : []
        };
    },
    componentDidMount : function(){
        $.get("http://130.211.249.49:8080/api/article/" + encodeURIComponent(this.props.link), function(result) {
            if (this.isMounted()) {
                this.setState({"article" : result});
                console.log(result);
            }
        }.bind(this));

    },
    render: function() {
        return (
            <div>{this.state.rawData}</div>
        );
    }
});

module.exports = Article;
