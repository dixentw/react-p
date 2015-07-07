var React = require('react');
var mui = require('material-ui');

var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;

var MyBtn = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render: function() {
    return (
        <RaisedButton label="Default" />
    );
  }

});

module.exports = MyBtn;
