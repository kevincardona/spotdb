import React from "react";
import "../layouts/ArtistTweet.css";
import { Link } from "react-router-dom";

class ArtistTweet extends React.Component {
  state = {
    artist: this.props.artist
  };

  render() {
    const { artist } = this.state;

    // console.log(artist);

    return (
      <div className="ArtistTweet">
        <Link to={"artist/" + artist.id}>
          <div className="artist">
            <img src={artist.images[0].url} alt="" />
            <p>{artist.name}</p>
          </div>
        </Link>
        <div className="score">
          <p className="subtitle">Score: </p>
          <p>
            <span>{artist.qualityScore}</span>
          </p>
        </div>
        <div className="tweet">
          <p className="subtitle">Someone tweeted:</p>
          <p>"{artist.randomTweet}"</p>
        </div>
      </div>
    );
  }
}

export default ArtistTweet;
