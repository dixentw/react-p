import React from 'react';
import {List, ListItem} from 'material-ui';

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
