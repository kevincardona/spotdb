import React from "react";
import { Link } from "react-router-dom";
import "../layouts/Search.css";
// import spotify_logo from '../assets/Spotify_Icon_RGB_Green.png';
import { apiGet } from "../util/api";
import PopupBanner from "../components/PopupBanner";

class Library extends React.Component {
  state = {
    query: this.props.match.params.query || "",
    // This is the array of results we get from the Spotify API
    results: [],
    error: false
  };

  librarySpotify = () => {
    apiGet("/library").then(data => {
      if (data.success) {
        console.log(data);
        this.setState({
          results: data.user,
          error: false
        });
      } else {
        this.setState({
          error: true,
          results: data.user
        });
      }
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      query: nextProps.match.params.query || ""
    };
  }

  componentDidMount() {
    this.librarySpotify();
  }

  render() {
    const { results, error } = this.state;

    /*if (results !== "") {
            this.librarySpotify()
        }*/

    return (
      <div>
        {error && (
          <PopupBanner text="There was an error, try logging in again." />
        )}
        <div className="Library">
          <h1>Song Library</h1>
          <ul className="Library-list">
            {/* This map function returns for every element in an array so you can show dynamic data */}
            {results.map(item => (
              <li key={item.track.id} className="Library-item">
                <img
                  src={
                    item.track.album.images.length > 0
                      ? item.track.album.images[0].url
                      : ""
                  }
                  alt="Artist profile"
                  className="Search-album-art"
                />
                <Link to={"/artist/" + item.track.artists[0].id}>
                  <span>{item.track.name}</span>
                </Link>
                <i>{item.popularity}</i>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Library;
