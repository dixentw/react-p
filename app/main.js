/* main.js */

'use strict';

var React = require('react');
//var TestOne = require('./TestOne.js');
//var TestTwo = require('./TestTwo.js');
var dataa = require('./lalala.js');
var MyBtn = require('./myBtn.js');
var MyCard = require('./card.js');
var $ = require('jquery');

var List = React.createClass({
    render : function(){
        return(
            <li>
                <span>{this.props.li.author}</span>
                <span>{this.props.li.title}</span>
            </li>
        );
    }
});
var Main = React.createClass({
    getInitialState: function() {
        return {};
    },
    render: function() {
        return (
            <div>
                <ul>
                    {
                        this.props.all.map(function(a){
                            return (<List li={a} />);
                        })
                    }
                </ul>
                <MyBtn />
            </div>
        );
    }
});

var Main2 = React.createClass({
    getInitialState: function() {
        return {
            ids :  []
        };
    },
    componentDidMount: function() {
        $.get("https://hacker-news.firebaseio.com/v0/newstories.json", function(result) {
            if (this.isMounted()) {
                this.setState({"ids" : result});
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div>
                <MyCard ids={this.state.ids} />
            </div>
        );
    }
});

React.render(<Main2 />, document.body);
