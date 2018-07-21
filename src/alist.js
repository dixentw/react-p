'use strict';
import React from 'react';
import {List, ListItem, ListItemText} from '@material-ui/core';

const alistBaseUrl = `/api/alist`

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

    componentWillReceiveProps() {
        this.fetchArticle(this.props.match.params.url);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll.bind(this));
    }
    
    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll.bind(this));
    }

    handleScroll () {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            console.log('fefefefef ->' + this.state.next);
            if (!this.loading) {
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
                        secondary={`${l.nrec} - ${l.author} - ${this.state.next}`} 
                        onClick={this.handleClick.bind(this, l.link)}
                    />
                </ListItem>
            );
        });
        const nextUrl = this.state.next;
        console.log(nextUrl);
        return (
            <List>
                {entries}
            </List>
        )
    }
}

//{/*onClick={this.handleClick.bind(this, l.link)}*/}

export default ArticleList;
