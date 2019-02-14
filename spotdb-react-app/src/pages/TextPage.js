import React from 'react';

class TextPage extends React.Component {
    state = {
        text : "",
    }

    componentDidMount() {
        // Gets the text data from the textFile prop
        // DON'T KNOW IF SECURE
        if (this.props.textFile) {
            fetch(this.props.textFile)
                .then((r) => r.text())
                .then((textdata) => {
                    this.setState({
                        text: textdata,
                    });
                });
        }
    }

    render() {
        return (
            <div className="TextPage">
            	{this.state.text ? 
                    <p>{this.state.text}</p>
                : 
                    <h1>This page will be entirely text.</h1>
                }
            </div>
        );
    }
}

export default TextPage;