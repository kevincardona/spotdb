import React from 'react';
import '../layouts/Search.css';

class Search extends React.Component {
	state = {
		params: this.props.location.search,
		results : [{id: 0, title: "Artist 1", info: "Something"}, {id: 1, title: "Artist 2", info: "Something"}, {id: 2, title: "Artist 3", info: "Something"}, {id: 3, title: "Artist 4", info: "Something"}],
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			params: nextProps.location.search,
		};
	}

	render() {
		const urlParams = new URLSearchParams(this.state.params);
		return (
			<div>
				<h1>This will process query parameters</h1>
				<h2>query = "{urlParams.get("query")}"</h2>
				<ul>
					{this.state.results.map((item,i) => (
						<li key={item.id}>
							{item.title} &emsp;&emsp; <i>{item.info}</i>
						</li>
						))}
				</ul>
			</div>
		);
	}
}

export default Search;