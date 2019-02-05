import React from 'react';
import '../layouts/Search.css';
import Navbar from '../components/Navbar';

class Search extends React.Component {
	state = {
		params: this.props.location.search,
	};

	static getDerivedStateFromProps(nextProps, prevState) {
		return {
			params: nextProps.location.search,
		};
	}

	render() {
		const p = new URLSearchParams(this.state.params);
		return (
			<div>
				<Navbar />
				<h1>This will process query parameters</h1>
				<h1>{p.get("query")}</h1>
			</div>
		);
	}
}

export default Search;