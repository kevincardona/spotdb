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

  componentDidMount() {
    this.getTrackInfo({ id: "35RDmXJ59YYGNlv1KfTGsP" }, function() {});
  }

  selectItem = (id, type) => {
    if (type === "album") {
      this.setState({
        selectedAlbum: id
      });
    }
  };

  getTrackInfo = (song, callbackFunction) => {
    apiGet("/songanalytics?" + song.id).then(data => {
      // console.log(song);
      console.log("THE NEXT LOG SHOULD BE THE TRACK INFO: ");
      console.log(data);
      // song["duration"] = data.track.duration;
      // song["tempo"] = data.track.tempo;
      // song["loudness"] = data.track.loudness;
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

  render() {
    const props = this.props;
    const state = this.state;

    if (state.selectedAlbum && state.selectedAlbum !== state.shownAlbum) {
      this.getAlbum(state.selectedAlbum);
      this.setState({
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
              className="CardList-item"
            >
              <Link
                to={
                  props.links
                    ? "/artist/" +
                      (item.type === "artist" ? item.id : item.artists[0].id)
                    : ""
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
                        <li
                          key={track.id}
                          className="Album-item Track-item"
                          onClick={() => this.playSong(track.id)}
                        >
                          {index + 1 + ". "} <b>{track.name}</b>
                          <br />
                          {(track.duration || "-") +
                            ", " +
                            (track.tempo || "-") +
                            ", " +
                            (track.loudness || "-")}
                          {/* <input
                            type="button"
                            value="Add"
                            className="addTrack"
                            onClick={() => this.saveSong(track.id)}
                          /> */}
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
