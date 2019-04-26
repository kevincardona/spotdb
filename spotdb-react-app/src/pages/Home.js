import React from "react";
import { Link } from "react-router-dom";
import "../layouts/Home.css";
import logo from "../assets/logo.svg";
import { apiPost, apiGet } from "../util/api";
import CardList from "../components/CardList";
import ArtistTweet from "../components/ArtistTweet";
const queryString = require("query-string");

class Home extends React.Component {
  // Home will use state to hold tweet info
  state = {
    artists: [],
    newAlbums: []
  };

  getFirstArtist = (artist, callbackFunction) => {
    apiGet("/firstartist?query=" + artist.name).then(data => {
      artist["id"] = data.user.artists.items[0].id;
      artist["images"] = data.user.artists.items[0].images;
      artist["followers"] = data.user.artists.items[0].followers;
      artist["genres"] = data.user.artists.items[0].genres;
      artist["popularity"] = data.user.artists.items[0].popularity;
      callbackFunction();
    });
  };

  retrieveArtists = () => {
    apiGet("/getTweetInfo")
      .then(data => {
        if (data) {
          var artists = data;

          let requests = artists.reduce((promiseChain, item) => {
            return promiseChain.then(
              () =>
                new Promise(resolve => {
                  this.getFirstArtist(item, resolve);
                })
            );
          }, Promise.resolve());

          requests.then(() => {
            this.setState({
              artists: artists
            });
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  getNewAlbums = () => {
    apiGet("/newalbums")
      .then(data => {
        if (data.success && !data.user.error) {
          this.setState({
            newAlbums: data.user.albums.items
          });
        } else {
          console.log(data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  //Authorization Stuff
  componentDidMount() {
    this.retrieveArtists();
    this.getNewAlbums();

    const parsed = queryString.parse(window.location.search);

    //If a user is logging in
    if (parsed.code) {
      const body = {
        code: parsed.code
      };

      apiPost("/authorized", body)
        .then(data => {
          if (data.success && data.token && data.display_name && data.id) {
            localStorage.setItem("token", data.token);
            this.props.userAuthorized(data.display_name);
          } else {
            this.props.userAuthorized("");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    const { artists, newAlbums } = this.state;

    return (
      <div className="Home">
        {/* /About Link */}
        <div className="Home-learn-more">
          <span>
            <b>What</b> is SpotDB?
          </span>
          <Link to="/about">Learn More</Link>
        </div>

        {/* This is the Personal twitter feed */}
        <div className="Home-spotdb-tweets" style={{ marginTop: "24px" }}>
          <div className="Home-tweet-list">
            <div className="Home-tweet">
              Hey Guys! Welcome to the launch of SpotDB. We'll be getting you
              some pretty dope data soon! Check us out. #spotdb #keepingitreal
            </div>
          </div>
          <div className="Home-tweet-right-column">
            <img src={logo} alt="SpotDB Logo" className="Home-spotdb-logo" />
            <span className="Home-tweeter">@spotdb</span>
          </div>
        </div>

        <h2>New Releases</h2>
        {newAlbums.length !== 0 ? (
          <CardList list={newAlbums} />
        ) : (
          <p>Login to view</p>
        )}

        {/* This is the template for the Tweet info */}
        {/* This map function returns for every element in an array so you can show dynamic data */}
        {/* {artists.map(item => (
          <div key={item.name}>
            <div className="Home-artist-title">{item.name}</div>
            <div className="Home-spotdb-tweets">
              <div className="Home-tweet-list">
                <div className="Home-tweet">
                  Artist Twitter Score: {item.qualityScore}
                </div>
              </div>
              <div className="Home-tweet-right-column">
                <img
                  src={logo}
                  alt="SpotDB Logo"
                  className="Home-spotdb-logo"
                />
                <span className="Home-tweeter">@spotdb</span>
              </div>
            </div>
          </div>
        ))} */}
        <h2>Artist Analysis</h2>
        {artists.map(item => (
          <ArtistTweet key={item.id} artist={item} />
        ))}
      </div>
    );
  }
}

export default Home;
