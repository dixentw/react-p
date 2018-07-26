'use strict';
import React from 'react';
import {List, ListItem, ListItemText, Dialog, Slide} from '@material-ui/core';
import Swipeable from 'react-swipeable'

import Article from './article';

const alistBaseUrl = '/api/alist'

const Transition = (props) => {
  return <Slide direction="left" {...props} />;
}

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            next : '',
            currUrl: '',
            currArticle: '',
            open: false,
        };
        this.loading = false;
    }

    fetchArticle(url) {
        if (url === this.state.currUrl) {
            return;
        }
        console.log(`trigger load!!! got url: ${url}, state url: ${this.state.currUrl}`);
        fetch(`${alistBaseUrl}/${url}`)
        .then( resp => resp.json() )
        .then((result) => {
            const aggr = [].concat(this.state.list, result.data);
            this.setState({
                next: encodeURIComponent(result.next),
                list: aggr,
                currUrl: url,
            });
            this.loading = false;
        })
    }

    componentDidMount() {
        console.log('mount');
        this.scrollHandler = this.handleScroll.bind(this);
        window.addEventListener("scroll", this.scrollHandler , false);
        this.fetchArticle(this.props.match.params.url);
    }

    componentWillUnmount() {
        console.log('umount');
        window.removeEventListener("scroll", this.scrollHandler, false);
    }

    handleScroll () {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log('------------->' + this.state.next);
            if (!this.loading && this.state.next) {
                this.loading = true;
                this.fetchArticle(this.state.next);
            }
        }
    }

    handleClick(link) {
        this.setState({
            open: true,
            currArticle: encodeURIComponent(link),
        });
    }

    handleSwiping() {
        console.log(`swipped!!!`);
        this.setState({
            open: false,
        });
    }

    render() {
        const entries = this.state.list.map((l) => {
            return (
                <ListItem button>
                    <ListItemText
                        primary={l.title}
                        secondary={`${l.nrec} - ${l.author}`}
                        onClick={this.handleClick.bind(this, l.link)}
                    />
                </ListItem>
            );
        });
        return (
            <div>
                <List>
                    {entries}
                </List>
                <Dialog
                      fullScreen
                      open={this.state.open}
                      onClose={this.handleClose}
                      TransitionComponent={Transition}
                >
                    <Swipeable onSwipingRight={this.handleSwiping.bind(this)}>
                        <Article url={this.state.currArticle}/>
                    </Swipeable>
                </Dialog>
            </div>
        )
    }
}

export default ArticleList;
