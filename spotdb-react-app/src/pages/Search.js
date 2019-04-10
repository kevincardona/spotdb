import React from "react";
import { Link } from "react-router-dom";
import "../layouts/Search.css";
// import spotify_logo from "../assets/Spotify_Icon_RGB_Green.png";
import { apiGet } from "../util/api";
import PopupBanner from "../components/PopupBanner";
// import Button from "../components/Button";

class Search extends React.Component {
  state = {
    query: this.props.match.params.query || "",
    prevApiQuery: "",
    // This is the array of results we get from the Spotify API
    artist_results: [],
    album_results: [],
    track_results: [],
    loading: true,
    error: false
  };

  searchSpotify = query => {
    apiGet("/search?query=" + query).then(data => {
      console.log(data);
      if (data.success) {
        console.log(data.user.items);
        this.setState({
          prevApiQuery: query,
          artist_results: data.user.artists.items,
          album_results: data.user.albums.items,
          track_results: data.user.tracks.items,
          loading: false,
          error: false
        });
      } else {
        this.setState({
          error: true,
          prevApiQuery: query,
          loading: false
        });
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      query: nextProps.match.params.query || ""
    };
  }

  render() {
    const {
      query,
      prevApiQuery,
      artist_results,
      album_results,
      track_results,
      error,
      loading
    } = this.state;

    if (query !== prevApiQuery) {
      this.searchSpotify(query);
    }

    return (
      <div>
        {error && (
          <PopupBanner text="There was an error, try logging in again." />
        )}
        <div className="Search">
          <h1>Search Page</h1>
          {loading && <div>Loading...</div>}
          <h2>Artists</h2>
          <ul className="Search-list">
            {/* This map function returns for every element in an array so you can show dynamic data */}
            {artist_results.map(artist => (
              <li key={artist.id} className="Search-item">
                <Link to={"/artist/" + artist.id}>
                  {artist.images.length > 0 && (
                    <img
                      src={artist.images[0].url}
                      alt={artist.name}
                      className="Search-image"
                    />
                  )}
                  <h3>{artist.name}</h3>
                  <p>{artist.popularity}</p>
                </Link>
              </li>
            ))}
          </ul>
          <h2>Albums</h2>
          <ul className="Search-list">
            {/* This map function returns for every element in an array so you can show dynamic data */}
            {album_results.map(album => (
              <li key={album.id} className="Search-item">
                <Link to={"/artist/" + album.artists[0].id + "#" + album.name}>
                  {album.images.length > 0 && (
                    <img
                      src={album.images[0].url}
                      alt={album.name + " album art"}
                      className="Search-image album"
                    />
                  )}
                  <h3>{album.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
          {/* Favorite / Tempo / Duration / Loudness */}
          <h2>Tracks</h2>
          <ul className="Search-list">
            {/* This map function returns for every element in an array so you can show dynamic data */}
            {track_results.map(track => (
              <li key={track.id} className="Search-item">
                <Link
                  to={"/artist/" + track.artists[0].id + "#" + track.album.name}
                >
                  {track.album.images.length > 0 && (
                    <img
                      src={track.album.images[0].url}
                      alt={track.album.name + " album art"}
                      className="Search-image album"
                    />
                  )}
                  <h3>{track.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
          {/* <Button action={this.searchSpotify}>Load More results...</Button> */}
        </div>
      </div>
    );
  }
}

export default Search;
