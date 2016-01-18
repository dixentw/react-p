import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
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
      console.log(this.state.oneNews);
      this.setState({"append": "append by click!!!!"});
      /*
      if(this.state.oneNews.descendants != 0){
          var allComment = "";
          this.state.oneNews.kids.forEach(function(v){
            $.get("https://hacker-news.firebaseio.com/v0/item/"+v+".json", function(result){
              allComment += result.text + "<br>";
            });
          });
          this.setState({"comments" : allComment})
      }*/
      //window.open(this.state.oneNews.url);
    },
    render: function() {
        return (
            <CardTitle title={this.state.oneNews.title} onClick={this.handleClick}>
              <CardText expandable={true}>
                { this.state.oneNews.text} | {this.state.append}
              </CardText>
            </CardTitle>
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
