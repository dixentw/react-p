import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

const hotListUrl = `/api/hot`

const fetcher = (board) => {
    if (board === 'hot') {
        return fetch(hotListUrl)
        .then((resp) => resp.json());
    } else {
        console.log('should implement get favorite boards from localCache');
    }
}

class BoardList extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        };
    }
    componentDidMount() {
        fetcher(this.props.board).then((output) => {
            this.setState({
                list: output
            });
        })
        .catch((e) => {console.error(e);});
    }

    render() {
        const entries = this.state.list.map((l) => {
            return (
                <ListItem button>
                    <ListItemText primary={l.boardCap} secondary={`${l.boardName} - ${l.hotness}`} />
                </ListItem>
            );
        });
        return (
            <List>
              {entries}
            </List>
        );
    }
}

module.exports = BoardList;
