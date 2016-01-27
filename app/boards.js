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
                            primaryText={a.boardName}
                            secondaryText={a.hotness}
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
