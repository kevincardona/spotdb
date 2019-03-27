import React from 'react';
import '../layouts/Me.css';
import PopupBanner from '../components/PopupBanner';
import logo from '../assets/logo.svg';
import { apiGet } from '../util/api';


class Me extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.userName || "No Name",
			artists: [{id: "", artistname: "", img: ""},{id: "", artistname: "", img: ""},{id: "", artistname: "", img: ""}]
		};
	}

	componentDidMount() {
		apiGet('/topartists').then((data) => {
			//data.user.item[index]
			console.log(data)
			const a = this.state.artists.slice();
			var i;
			for (i = 0; i < 4; i++) {
				a[i] = {id: data.user.items[i].id, artistname: data.user.items[i].name, img: data.user.items[i].images[0].url};
			}
			this.setState({artists: a});
			//this.forceUpdate();
			//console.log(this.state)
		}).catch((err) => {
			console.log(err);
		})
	} 

	render() {
		const { name } = this.state;
		const artistArr = this.state.artists;
		console.log(artistArr)

		return (
			<div>

				{/* This is the banner that notifies when not logged in */}
				{!this.props.userName && <PopupBanner text="Please log in to get personalized results! You are only seeing an example page." />}
				
				<div className="Me">
					
					<div className="Me-hero">These are {name}'s Favorite Artists!</div>

					{/* This is the template for the Tweet info */}
					<div>
					<div className="Home-artist-title">{artistArr[0].artistname}</div>
					<div className="Home-spotdb-tweets">
					<div className="Home-tweet-list">
					<div className="Home-tweet">
					Wow! #spotdb #goinggaga
					</div>
					</div>
					<div className="Home-tweet-right-column">
					<img src={artistArr[0].img} alt="SpotDB Logo" className="Home-spotdb-logo" />
					<span className="Home-tweeter">@spotdb</span>
					</div>
					</div>
					</div>
					<div>
					<div className="Home-artist-title">{artistArr[1].artistname}</div>
					<div className="Home-spotdb-tweets">
					<div className="Home-tweet-list">
					<div className="Home-tweet">
					24 Carrots made of Gold? #spotdb #pun-a-licious
					</div>
					</div>
					<div className="Home-tweet-right-column">
					<img src={artistArr[1].img} alt="SpotDB Logo" className="Home-spotdb-logo" />
					<span className="Home-tweeter">@spotdb</span>
					</div>
					</div>
					</div>


				</div>
			</div>
		);
	}
}

export default Me;