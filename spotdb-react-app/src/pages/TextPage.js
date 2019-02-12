import React from 'react';
import FooterNav from '../components/FooterNav';

class TextPage extends React.Component {
    state = {
        text : "",
    }

    componentDidMount() {
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
            <div className="main-content">
                <div className="TextPage">
                	{this.state.text ? 
                        <p>{this.state.text}</p>
                    : 
                        <h1>This page will be entirely text.</h1>
                    }
                </div>
                <FooterNav />
            </div>
        );
    }
}

export default TextPage;