import React from "react";
import "../layouts/Artist.css";
import PopupBanner from "../components/PopupBanner";
import { apiGet } from "../util/api";

class Artist extends React.Component {
  /*
		This has the the artist data we get from Spotify
		We get the id to search is by from the url from "props.match.params.id"
		(The params name is defined in Routes.js)
	*/
  state = {
    urlId: this.props.match.params.artist_id || "",
    artist: {},
    error: false,
    invalidIdError: false
  };

  getArtist = id => {
    apiGet("/artist?query=" + id).then(data => {
      console.log(data);
      if (data.success) {
        if (data.user.error) {
          this.setState({
            invalidIdError: true,
            artist: {
              id: id,
              name: "Error",
              popularity: -1
            }
          });
        } else {
          // SUCCESS
          this.setState({
            artist: data.user,
            error: false,
            invalidIdError: false
          });
        }
      } else {
        this.setState({
          error: true,
          artist: {
            id: id,
            name: "Error",
            popularity: -1
          }
        });
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      urlId: nextProps.match.params.artist_id || ""
    };
  }

  render() {
    const { urlId, artist, error, invalidIdError } = this.state;

    if (urlId !== artist.id) {
      this.getArtist(urlId);
    }

    console.log(artist);

    if (artist) {
      return (
        <div>
          {error && <PopupBanner text="Error! Try logging in again." />}
          {invalidIdError && <PopupBanner text="Error! Invalid Artist ID." />}
          {/* This banner should only show if you go to '/artist' */}
          <div className="Artist">
            <div className="Artist-profile-image">
              <img
                className="full-hero"
                src={
                  artist.images && artist.images.length > 0
                    ? artist.images[0].url
                    : ""
                }
                alt=""
              />
            </div>
            <h1>Artist page for {artist.name}</h1>
            {artist.popularity && <p>Popularity of {artist.popularity}</p>}
            {artist.followers && <p>Followers: {artist.followers.total}</p>}
            {artist.genres && <p>Genres: {artist.genres.join(", ")}</p>}
          </div>
        </div>
      );
    } else {
      return (
        <div className="Artist">
          <div className="loader">
            <img src="" alt="" />
          </div>
        </div>
      );
    }
  }
}

export default Artist;
