'use strict';
import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

import Article from '.article';

const alistBaseUrl = `/api/alist`

const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

class ArticleList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            next : '',
            currUrl: '',
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
        console.log(link);
        this.props.history.push(`/article/${encodeURIComponent(link)}`)
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
                    <Article url={this.state.currArticle}/>
                </Dialog>
            </div>
        )
    }
}

export default ArticleList;
