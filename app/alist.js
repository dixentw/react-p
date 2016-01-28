'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import $ from 'jquery';

var BoardList = React.createClass({
    //custom function
    recordCurrentHeight : function(){
        return $("body").scrollTop();
    },
    getInitialState: function() {
        return {
            articles : [],
        };
    },
    componentDidMount : function(){
        var link = encodeURIComponent(this.props.link);
        var pageCount = 0;
        $(document).on("scroll", function(){
            if ($(window).scrollTop() == $(document).height() - $(window).height()) {
                console.log("hit bottom!!!");
                pageCount++;
                $.get("http://130.211.249.49:8080/api/articlelist/" + link + "/" + pageCount, function(result) {
                    if (this.isMounted()) {
                        var a = this.state.articles;
                        var theNew = a.concat(result);
                        this.setState({"articles" : theNew});
                    }
                }.bind(this));
            }
        }.bind(this));
        $.get("http://130.211.249.49:8080/api/articlelist/" + link + "/" + pageCount, function(result) {
            if (this.isMounted()) {
                this.setState({"articles" : result});
            }
        }.bind(this));
    },
    componentWillUnmount : function(){
        $(document).off('scroll');
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
                            onTouchTap={that.props.clickEvt.bind(null, a.link, that.recordCurrentHeight())}
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
