import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var BoardList = React.createClass({
    render: function() {
        var that = this;
        return (
            <List>
            {
                this.props.ids.map(function(a, i){
                    return (
                        <ListItem
                            style={{secondaryText : {"fontSize" : 44, "color" : "red"}}}
                            primaryText={a.boardName}
                            secondaryText={a.hotness + "   |   " + a.boardCap}
                            onTouchTap={that.props.clickEvt.bind(null, a.link)}
                            key={i}
                        />
                    )
                })
            }
            </List>
        );
    }
});

module.exports = BoardList;
