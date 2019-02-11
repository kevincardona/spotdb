import React from 'react';
import '../layouts/Me.css';

class Me extends React.Component {
	state = {
		name: this.props.userName || "John Smith",
		birthday: "6/24/97",
		follower_count: 1,
		following_count: 41,
	}

	closeWarning = () => {
		var x = document.getElementById("MeAccountWarning");
		x.classList.add("closed");
	}

	render() {
		const { name } = this.state;

		return (
			<div className="Me">
				{!this.props.userName && <div id="MeAccountWarning" className="Me-account-warning"><div className="Me-account-warning-text">Please log in to get personalized results! You are only seeing an example page.</div><button onClick={this.closeWarning} className="Me-account-warning-close"></button></div>}
				<h1>This is for {name}.</h1>
			</div>
		);
	}
}

export default Me;