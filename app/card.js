import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import $ from 'jquery'

var MyList = React.createClass({
    getInitialState: function() {
        return {
            oneNews :  {}
        };
    },
    componentDidMount: function() {
        $.get("https://hacker-news.firebaseio.com/v0/item/"+this.props.id+".json", function(result) {
            if (this.isMounted()) {
                this.setState({"oneNews" : result});
            }
        }.bind(this));
    },
    handleClick: function(event) {
      alert(this.state.oneNews.url);
    },
    render: function() {
        return (
            <CardTitle title={this.state.oneNews.title} subtitle={this.state.oneNews.url} onClick={this.handleClick}/>
        );
    }
});

var MyCard = React.createClass({
    getInitialState: function(){
      return ({
          ids : []
      });
    },

    render: function() {
        return (
            <Card>
            {
                this.props.ids.map(function(a){
                    return (<MyList key={a} id={a} />);
                })
            }
            </Card>
        );
    }
});

module.exports = MyCard;
