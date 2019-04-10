import React, { Component } from "react";
import { apiGet, apiPost } from "../util/api";
import { Link } from "react-router-dom";
import "../layouts/Player.css";

function SongList(props) {
  const top_songs = props.top_songs;

  var song_list = [];
  for (var key in top_songs) {
    song_list.push({
      id: key,
      name: top_songs[key].name,
      count: top_songs[key].count,
      artist: top_songs[key].artist
    });
  }
  const listItems = song_list.map(song => (
    <div>
      {song.count} listening to{" "}
      <Link to={"/artist/" + song.artist}>{song.name}</Link>
    </div>
  ));
  return <div>{listItems}</div>;
}

export default class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cover_image: "",
      song: "",
      artist: "",
      listeners: 0,
      song_id: null,
      location: ""
    };
  }

  componentWillMount() {
    apiGet(`/listening`)
      .then(data => {
        if (!data.success) {
          return;
        }
        try {
          this.setState({
            artist: data.item.album.artists[0].name,
            song: data.item.name,
            cover_image: data.user.item.album.images[0].url,
            song_id: data.user.item.id
          });
        } catch (err) {}
      })
      .catch(error => {});

    setInterval(() => {
      this.update();
    }, 2000);
  }

  componentDidMount() {
    this.setState({ location: this.props.location });
  }

  update() {
    apiGet(`/listening`)
      .then(data => {
        try {
          var artist = data.user.item.album.artists[0].name;
          var song = data.user.item.name;
          var cover_image = data.user.item.album.images[0].url;
          var song_id = data.user.item.id;
          this.setState({
            artist: artist,
            song: song,
            cover_image: cover_image,
            song_id: song_id
          });
        } catch (err) {}
      })
      .catch(error => {
        console.log(error);
      });
    /* Todo, shorten to 1 call */
    apiPost(`/currentlisteners`, { song_id: this.state.song_id })
      .then(data => {
        try {
          this.setState({ listeners: data.listeners });
        } catch (err) {}
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { song, artist, cover_image, listeners } = this.state;
    // var style = {
    //   fontSize: "10px",
    //   margin: "0",
    //   display: "inline"
    // };

    return (
      <div className="player-container">
        <div className="player-panel">
          <div className="player-header">
            <img
              className="player-song-image"
              src={cover_image}
              alt="Album Artwork"
            />
            <br />
            {song && artist && (
              <div className="player-song">
                {song}
                <div className="player-song-artist">{artist}</div>
              </div>
            )}
          </div>
          <div className="player-body">
            <h1>Global Listeners</h1>
            {listeners > 0 && cover_image !== "" && (
              <div>
                {listeners}
                <br />
                SpotDB users listening to this song
              </div>
            )}
            <br />
            <h1>Local Listeners</h1>
            {this.props.location}
            {this.props.top_songs && (
              <SongList top_songs={this.props.top_songs} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
