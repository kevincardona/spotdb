import React from "react";
import { Link } from "react-router-dom";
import "../layouts/CardList.css";
import { apiGet, apiPost } from "../util/api";

class CardList extends React.Component {
  state = {
    selectedAlbum: "",
    shownAlbum: "",
    tracks: []
  };

  selectItem = (id, type) => {
    if (type === "album") {
      if (this.state.selectedAlbum !== id) {
        this.setState({
          selectedAlbum: id
        });
      } else {
        this.setState({
          selectedAlbum: ""
        });
      }
    }
  };

  getTrackInfo = (song, callbackFunction) => {
    apiGet("/songanalytics?" + song.id).then(data => {
      song["duration"] = data.user.duration_ms;
      song["tempo"] = data.user.tempo;
      song["loudness"] = data.user.loudness;
      song["acousticness"] = data.user.acousticness;
      song["dancibility"] = data.user.dancibility;
      song["energy"] = data.user.energy;
      song["instrumentalness"] = data.user.instrumentalness;
      song["key"] = data.user.key;
      song["liveness"] = data.user.liveness;
      song["speechiness"] = data.user.speechiness;
      song["time_signature"] = data.user.time_signature;
      song["valence"] = data.user.valence;
      callbackFunction();
    });
  };

  getAlbum = id => {
    console.log("GET Album : getAlbum : " + id);
    apiGet("/albumtracks?query=" + id).then(data => {
      if (data.success) {
        if (!data.user.error) {
          var songs = data.user.items;

          let requests = songs.reduce((promiseChain, item) => {
            return promiseChain.then(
              () =>
                new Promise(resolve => {
                  this.getTrackInfo(item, resolve);
                })
            );
          }, Promise.resolve());

          requests.then(() => {
            console.log(songs);
            this.setState({
              tracks: songs
            });
          });
        }
      }
    });
  };

  playSong = id => {
    console.log("POST Play : playSong : " + id);
    apiPost("/play?id=" + id);
  };

  saveSong = id => {
    console.log("POST Savesong : saveSong : " + id);
    apiPost("/savesong?id=" + id);
  };

  toMinutesSecondsDisplay = ms =>
    Math.floor(ms / 1000 / 60) + ":" + Math.ceil((ms / 1000) % 60);

  render() {
    const props = this.props;
    const state = this.state;

    if (state.selectedAlbum && state.selectedAlbum !== state.shownAlbum) {
      this.getAlbum(state.selectedAlbum);
      this.setState({
        tracks: [],
        shownAlbum: state.selectedAlbum
      });
    }

    return (
      <ul className="CardList">
        {/* This map function returns for every element in an array so you can show dynamic data */}
        {props.list &&
          props.list.map(item => (
            <li
              key={item.id}
              id={"Album:" + item.id}
              onClick={() => this.selectItem(item.id, item.type)}
              className={
                "CardList-item " +
                (item.id === state.selectedAlbum && " selected ")
              }
            >
              <Link
                to={
                  props.links
                    ? "/artist/" +
                      (item.type === "artist" ? item.id : item.artists[0].id)
                    : "#"
                }
              >
                {(item.images && item.images.length > 0 && (
                  <img
                    src={item.images[0].url}
                    alt={item.name}
                    className="CardList-image"
                  />
                )) ||
                  (item.album &&
                    item.album.images &&
                    item.album.images.length > 0 && (
                      <img
                        src={item.album.images[0].url}
                        alt={item.name}
                        className="CardList-image"
                      />
                    ))}
                <h3>{item.name}</h3>
                {/* TODO : Favorite / Tempo / Duration / Loudness */}
                {item.type === "album" && item.id === state.selectedAlbum && (
                  <ul className="Album-list Track-list">
                    {state.tracks && <h4>Tracks:</h4>}
                    {state.tracks &&
                      state.tracks.map((track, index) => (
                        <li key={track.id} className="Album-item Track-item">
                          <div className="title">
                            <p>
                              {index + 1 + ". "}
                              <b>{track.name}</b>
                            </p>
                          </div>
                          <div className="stats">
                            <p>
                              <i class="fas fa-clock" />
                              {(this.toMinutesSecondsDisplay(track.duration) ||
                                "-") + ", "}
                              <i class="fas fa-music" />
                              {(Math.round(track.tempo) || "-") + ", "}
                              <i class="fas fa-volume-up" />
                              {(Math.round(track.loudness + 14) || "0") + ""}
                            </p>
                          </div>
                          <div className="controls">
                            <div onClick={() => this.playSong(track.id)}>
                              <i class="fas fa-play" />
                              <p>Play</p>
                            </div>
                            <div onClick={() => this.saveSong(track.id)}>
                              <i class="fas fa-heart" />
                              <p>Favorite</p>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
                {props.children}
              </Link>
            </li>
          ))}
      </ul>
    );
  }
}

export default CardList;
