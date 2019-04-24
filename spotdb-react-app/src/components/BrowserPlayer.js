import React from "react";
import "../layouts/BrowserPlayer.css";
import { apiGet, apiPost } from "../util/api";
import logo from "../assets/logo.svg";
import EmptySpace from "../components/EmptySpace";
class BrowserPlayer extends React.Component {
  state = {
    userName: this.props.userName || "",
    listening: false,
    currentSong: "",
    songArt: "",
    playing: false
  };

  componentDidMount = () => {
    this.getCurrentlyPlaying();

    setInterval(() => {
      this.getCurrentlyPlaying();
    }, 2000);
  };

  getCurrentlyPlaying = () => {
    // if (this.state.userName) {
    apiGet("/listening").then(data => {
      if (data.success) {
        this.setState({
          listening: true,
          currentSong: data.user.item.name,
          songArt: data.user.item.album.images.slice(-1)[0].url || logo,
          playing: data.user.is_playing
        });
      } else {
        this.setState({
          listening: false
        });
      }
    });
    // }
  };

  playPause = playing => {
    if (playing) {
      apiPost("/pause")
        .then(() => {
          this.getCurrentlyPlaying();
        })
        .catch(error => {
          console.log("Play error");
        });
    } else {
      apiPost("/play")
        .then(() => {
          this.getCurrentlyPlaying();
        })
        .catch(error => {
          console.log("Play error");
        });
    }
  };

  render() {
    const { listening, currentSong, songArt, playing } = this.state;

    if (listening) {
      return (
        <>
          <EmptySpace height="75px" />
          <div className="BrowserPlayer">
            <div className="ActualBar">
              <img className="album-art" src={songArt} alt="" />
              <p className="song-name">{currentSong}</p>
              <div
                className="play-button"
                onClick={() => {
                  this.playPause(playing);
                }}
              >
                <div className={"button " + (playing ? " pause" : " play")} />
                {/* <div
                id="triangle-right"
                style={playing ? { display: "block" } : { display: "none" }}
              />
              <div
                id="double-line"
                style={playing ? { display: "none" } : { display: "block" }}
              /> */}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}

export default BrowserPlayer;
