'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import {List,ListItem} from 'material-ui';
import Colors from 'material-ui/styles/colors';
import $ from 'jquery';
import config from './config.js'
import Article from './article.js';

var BoardList = React.createClass({
    theUrl : "",
    getInitialState: function() {
        return {
            articles : [],
            article : {},
            pageCount : this.props.pc,
            openArticle : false
        };
    },
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

    componentDidMount : function(){
        var link = encodeURIComponent(this.props.link);
        this.theUrl = link;
        this.updateArticle();
    },
    openDialog : function(link){
        this.fetch(link);
        this.setState({
            'openArticle' : true
        });
    },
    closeDialog : function(){
        this.setState({
            'openArticle' : false
        });
    },
    fetch : function(link){
        $.get(config.getUrl() +'/api/article/' + encodeURIComponent(link), function(result) {
            if (this.isMounted()) {
                this.setState({"article" : result});
            }
        }.bind(this));
    },
    render: function() {
        console.log("alist");
        var that = this;
        //prepare prev
        var prev;
        if(this.state.pageCount > 1){
            prev = <ListItem primaryText={"Previous"} onTouchTap={this.getPrevious}/>
        }else{
            prev = null;
        }
        var props = {
            link : this.state.article,
            open : this.state.openArticle,
            article : this.state.article,
            close :this.closeDialog
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
                            onTouchTap={that.openDialog.bind(null, a.link, that.recordCurrentHeight())}
                            key={i}
                        />
                    )
                })
            }
            <Article {...props}></Article>
            <ListItem
                primaryText={"Next"}
                onTouchTap={this.getNext}
                key={999}
            />
            </List>
        );
    }
});

module.exports = BoardList;
