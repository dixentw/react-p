import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

const hotListUrl = `/api/hot`

const fetcher = (board) => {
    if (board === 'hot') {
        return fetch(hotListUrl)
        .then((resp) => resp.json());
    } else {
        console.log('should implement get favorite boards from localCache');
        return new Promise((resolve, rejects)=> {
            resolve([])
        });
    }
}

const styles = {
    //color: 'rgba(200, 200, 200, 0.8)',
    primary: {
        color: 'white',
    }
};

class BoardList extends React.Component  {
    constructor(props) {
        super(props)
        this.state = {
            list: []
        };
    }
    
    componentDidMount() {
        fetcher(this.props.match.params.from).then((output) => {
            this.setState({
                list: output
            });
        })
        .catch((e) => {console.error(e);});
    }
    
    componentWillReceiveProps() {
        console.log('board list received');
        fetcher(this.props.match.params.from).then((output) => {
            this.setState({
                list: output
            });
        })
        .catch((e) => {console.error(e);});
    }

    handleClick(link) {
        console.log(link);
        this.props.history.push(`/alist/${encodeURIComponent(link)}`)
    }

    render() {
        const entries = this.state.list.map((l) => {
            return (
                <ListItem button>
                    <ListItemText
                        classes = {styles}
                        primary={l.boardCap} 
                        secondary={`${l.boardName} - ${l.hotness}`} 
                        onClick={this.handleClick.bind(this, l.link)}
                    />
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
