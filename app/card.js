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
        console.log(this.props.ids.length);
        if(this.props.ids.length == 0){
            return (<MyList key={"9845885"} id={"9845885"} />);
        }else{
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

    }
});

module.exports = MyCard;
