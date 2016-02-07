'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Colors from 'material-ui/lib/styles/colors';
import $ from 'jquery';
import config from './config.js'

var BoardList = React.createClass({
    //custom function
    theUrl : "",
    recordCurrentHeight : function(){
        return this.state.pageCount;
    },
    getPrevious : function(){
        var count = this.state.pageCount;
        if(count > 1){
            count = count -1;
            this.setState({"pageCount": count}, ()=>{
                this.updateArticle();
            });
        }
    },
    getNext : function(){
        var count = this.state.pageCount;
        count = count + 1;
        this.setState({"pageCount": count}, ()=> {
            this.updateArticle();
        });
    },
    updateArticle : function(){
        $.get(config.getUrl() + "/api/articlelist/" + this.theUrl + "/" + this.state.pageCount, function(result) {
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
        this.updateArticle();
    },
    render: function() {
        var that = this;
        var prev;
        if(this.state.pageCount > 1){
            prev = <ListItem primaryText={"Previous"}
                onTouchTap={this.getPrevious}
                style={{"backgroundColor" : Colors.cyan600}}/>
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
                style={{"backgroundColor" : Colors.cyan600}}
            />
            </List>
        );
    }
});

module.exports = BoardList;
