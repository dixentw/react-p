import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

const hotListUrl = `https://www.ptt.cc/bbs/hotboards.html`

const fetcher = (board) => {
    if (board === 'hot') {
        return fetch(hotListUrl).then((resp) => {
            console.log(resp);
            console.log(resp.text());
        });
    } else {
        console.log('should implement get favorite boards from localCache');
    }
}

/*
    listItem consist with 
    {
        boardName
        boardCaption
        hotness
    }
*/

class BoardList extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        };
    }
    componentDidMount() {
        fetcher(this.props.bind).then((output) => {
            this.setState({
                list: ['newList']
            });
        });
    }

    render() {
        return (
            <List>
                <ListItem button>
                    <ListItemText primary='it shows first board' />
                </ListItem>
            </List>
        );
    }
}

module.exports = BoardList;
