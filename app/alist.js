import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import $ from 'jquery';

var BoardList = React.createClass({
    getInitialState: function() {
        return {
            articles : []
        };
    },
    componentDidMount : function(){
        $.get("http://130.211.249.49:8080/api/articlelist/" + encodeURIComponent(this.props.link) + "/0", function(result) {
            if (this.isMounted()) {
                this.setState({"articles" : result});
            }
        }.bind(this));

    },
    render: function() {
        var that = this;
        return (
            <List>
            {
                this.state.articles.map(function(a, i){
                    return (
                        <ListItem
                            primaryText={a.title}
                            secondaryText={a.author}
                            onTouchTap={that.props.clickEvt.bind(null, a.link)}
                            key={i}
                        />
                    )

                })
            }
            </List>
        );
    }
});

module.exports = BoardList;
