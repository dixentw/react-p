var React = require('react');
var mui = require('material-ui');
var $ = require('jquery');

var ThemeManager = new mui.Styles.ThemeManager();
var Card = mui.Card;
var CardHeader = mui.CardHeader;


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
    render: function() {
        //console.log(this.state.oneNews);
        return (
            <CardHeader title={this.state.oneNews.title} subtitle={this.state.oneNews.url} />
        );
    }
});

var MyCard = React.createClass({
    getInitialState: function(){
      return ({
          ids : ["9845885", "9845870"]
      });
    },
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    render: function() {
        console.log("a;a;;a");
        return (
            <Card>
            {
                this.state.ids.map(function(a){
                    return (<MyList id={a} />);
                })
            }
            </Card>
        );
        /*
        return (
            <Card>
                <MyList id={this.state.ids[0]}/>
                <MyList id={this.state.ids[1]}/>
            </Card>
        );
        */
    }
});

module.exports = MyCard;
