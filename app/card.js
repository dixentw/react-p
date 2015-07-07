var React = require('react');
var mui = require('material-ui');

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
        console.log(this.state.oneNews);
        return (
            <CardHeader title="Title" subtitle="lalalal" avatar={<Avatar>A</Avatar>} />
        );
    }
});

var MyCard = React.createClass({
    getInitialState: function(){
      return ({
          ids : [1234]
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
        var i;
        if(this.props.ids.length == 0){
            i = this.state.ids;
        }
        return (
            <Card>
            {
                i.map(function(a){
                    console.log(a);
                    //return (<MyList id={a} />);
                    return (
                        <CardHeader title="{aaaaa}" subtitle="kakakak" />
                    );
                })
            }
            </Card>
        );
        /*
        return (
            <Card>
                <CardHeader
                title="Title"
                subtitle="Subtitle"
                />
            </Card>
        );//*/
    }
});

module.exports = MyCard;
