import React from "react";
import "../layouts/Artist.css";
import PopupBanner from "../components/PopupBanner";
import CardList from "../components/CardList";
import { apiGet, apiPost } from "../util/api";

class Artist extends React.Component {
  /*
		This has the the artist data we get from Spotify
		We get the id to search is by from the url from "props.match.params.id"
		(The params name is defined in Routes.js)
	*/
  state = {
    urlId: this.props.match.params.artist_id || "",
    artist: {},
    albums: [],
    tracks: [],
    error: false,
    invalidIdError: false,
    selectedAlbum: "7DF5fyCAcAilUhClk48jjH",
    shownAlbum: ""
  };

  getArtist = id => {
    console.log("GET Artist : getArtist : 24");
    apiGet("/artist?query=" + id).then(data => {
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

          apiPost("/addArtistToDB", {name: data.user.name}).then((data) => {
            console.log('successful db');
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

    apiGet("/artistalbums?query=" + id).then(data => {
      if (data.success) {
        if (!data.user.error) {
          // SUCCESS
          this.setState({
            albums: data.user.items
          });
        }
      }
    });
  };

  getAlbum = id => {
    console.log("GET Album : getAlbum : 69");
    apiGet("/albumtracks?query=" + id).then(data => {
      if (data.success) {
        if (!data.user.error) {
          this.setState({
            tracks: data.user.items
          });
        }
      }
    });
  };

  selectAlbum = id => {
    console.log("Album: " + id);
    this.setState({
      selectedAlbum: id
    });
  };

  saveSong = id => {
    console.log("Track: " + id);
    apiPost("/savesong?id=" + id);
  };

  playSong = id => {
    console.log("PLAY SONG");
    apiPost("/play?id=" + id);
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      urlId: nextProps.match.params.artist_id || ""
    };
  }

  render() {
    const {
      urlId,
      artist,
      albums,
      error,
      invalidIdError,
      selectedAlbum,
      shownAlbum
    } = this.state;

    if (urlId !== artist.id) {
      this.getArtist(urlId);
    }
    if (selectedAlbum && selectedAlbum !== shownAlbum) {
      this.getAlbum(selectedAlbum);
      this.setState({
        shownAlbum: selectedAlbum
      });
    }

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

            <h2>Albums</h2>
            <CardList list={albums} />
            {/* <ul className="Album-list">
              {albums.map(album => (
                <li
                  key={album.id}
                  className={
                    "Album-item " + (album.id === selectedAlbum && " selected ")
                  }
                  onClick={() => this.selectAlbum(album.id)}
                >
                  <div>
                    {album.images.length > 0 && (
                      <img
                        src={album.images[0].url}
                        alt={album.name + " album art"}
                        className="Album-image"
                      />
                    )}
                    <h3>{album.name}</h3>
                    {album.id === selectedAlbum && (
                      <ul className="Album-list Track-list">
                        {tracks && <h4>Tracks:</h4>}
                        {tracks &&
                          tracks.map((track, index) => (
                            <li
                              key={track.id}
                              className="Album-item Track-item"
                              onClick={() => this.playSong(track.id)}
                            >
                              {index + 1 + ". "} <b>{track.name}</b>
                              <input
                                type="button"
                                value="Add"
                                className="addTrack"
                                onClick={() => this.saveSong(track.id)}
                              />
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </li>
              ))}
            </ul> */}
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
