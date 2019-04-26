import React from "react";
import { Redirect } from "react-router-dom";
import "../layouts/Me.css";
import PopupBanner from "../components/PopupBanner";
import { apiGet } from "../util/api";
import CardList from "../components/CardList";

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userName || "No Name",
      artists: [],
      library: [],
      redirect: false
    };
  }

  componentWillMount() {
    apiGet(`/authenticate`)
      .then(data => {
        if (!data.success) {
          this.setState({
            redirect: true
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.topArtists();
    this.librarySpotify();
  }

  topArtists = () => {
    apiGet("/topartists")
      .then(data => {
        this.setState({ artists: data.user.items });
      })
      .catch(err => {
        console.log(err);
      });
  };

  librarySpotify = () => {
    apiGet("/library").then(data => {
      if (data.success) {
        this.setState({
          library: data.user.items
        });
      }
    });
  };

  render() {
    const { name, artists, library, redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {/* This is the banner that notifies when not logged in */}
        {!this.props.userName && (
          <PopupBanner text="Please log in to get personalized results! You are only seeing an example page." />
        )}

        <div className="Me">
          <div className="Me-hero">These are {name}'s Favorite Artists!</div>
          <CardList list={artists} links />
          <div className="Me-hero">These are {name}'s Tracks!</div>
          <CardList list={library} links />
        </div>
      </div>
    );
  }
}

export default Me;
