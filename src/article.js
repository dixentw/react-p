'use strict';
import React from 'react';

const articleBaseUrl = `/api/article`;

class Article extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: ''
        };
    }

    componentWillReceiveProps() {
        fetch(`${articleBaseUrl}/${this.props.match.params.url}`)
        .then( resp => resp.json() )
        .then((output) => {
            console.log(output);
            this.setState({
                text: output.rawData
            });
        })
        .catch((e) => {console.error(e);});
    }

    componentDidMount() {
        fetch(`${articleBaseUrl}/${this.props.match.params.url}`)
        .then( resp => resp.json() )
        .then((output) => {
            console.log(output);
            this.setState({
                text: output.rawData
            });
        })
        .catch((e) => {console.error(e);});
    }

    render() {
        const output = {
            '__html' : this.state.text
        }
        console.log(output);
        return (
            <div dangerouslySetInnerHTML={output} />
        );
    }
}

//{/*<div id="main-container" dangerouslySetInnerHTML={output}/>*/}
export default Article;
