/* main.js */

'use strict';

var React = require('react');
//var TestOne = require('./TestOne.js');
//var TestTwo = require('./TestTwo.js');
var dataa = require('./lalala.js')

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
            <ul>
                {
                    this.props.all.map(function(a){
                        return (<List li={a} />);
                    })
                }
            </ul>
        );
    }
});
React.render(<Main all={dataa} />, document.body);
