'use strict';
import React from 'react';
import Swipeable from 'react-swipeable'

const articleBaseUrl = `/api/article`;


const Transition = (props) => {
  return <Slide direction="up" {...props} />;
}

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
            this.setState({
                text: output.rawData
            });
        })
        .catch((e) => {console.error(e);});
    }

    handleSwiping() {
        console.log(`swipped!!!`);
    }

    render() {
        const output = {
            '__html' : this.state.text
        }
        return (
            <Swipeable onSwipingRight={this.handleSwiping}>
                <div id="main-container" dangerouslySetInnerHTML={output} />
            </Swipeable>
        );
    }
}

export default Article;
