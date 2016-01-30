'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import $ from 'jquery';

var BoardList = React.createClass({
    //custom function
    theUrl : "",
    recordCurrentHeight : function(){
        return this.state.pageCount;
    },
    getPrevious : function(){
        var count = this.state.pageCount;
        if(count > 0){
            count = count -1;
            this.setState({"pageCount": count});
            this.updateArticle();
        }
    },
    getNext : function(){
        var count = this.state.pageCount;
        count = count + 1;
        this.setState({"pageCount": count});
        this.updateArticle();
    },
    updateArticle : function(){
        $.get("http://130.211.249.49:8080/api/articlelist/" + this.theUrl + "/" + this.state.pageCount, function(result) {
            if (this.isMounted()) {
                this.setState({"articles" : result});
            }
        }.bind(this));
    },
    getInitialState: function() {
        return {
            articles : [],
            pageCount : this.props.pc
        };
    },
    componentDidMount : function(){
        var link = encodeURIComponent(this.props.link);
        this.theUrl = link;
        //console.log("re-render~~~~");
        //console.log(this.theUrl);
        this.updateArticle();
    },
    render: function() {
        var that = this;
        var prev;
        if(this.state.pageCount > 0){
            prev = <ListItem primaryText={"Previous"} onTouchTap={this.getPrevious} style={{"color" : "yellow"}}/>
        }else{
            prev = null;
        }
        return (
            <List>
            {prev}
            {

                this.state.articles.map(function(a, i){
                    return(
                        <ListItem
                            primaryText={a.title}
                            secondaryText={a.author}
                            onTouchTap={that.props.clickEvt.bind(null, a.link, that.recordCurrentHeight())}
                            key={i}
                        />
                    )
                })
            }
            <ListItem
                primaryText={"Next"}
                onTouchTap={this.getNext}
                key={999}
                style={{"color" : "yellow"}}
            />
            </List>
        );
    }
});

module.exports = BoardList;
