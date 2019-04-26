import React, { Component } from "react";
import "../layouts/SongMap.css";
import loader from "../assets/loader.svg";
import Map from "../layouts/MapTheme";
import { apiPost, apiGet } from "../util/api";
import { Redirect } from "react-router-dom";
import Player from "../components/Player";

let markers = [];

export default class SongMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      hasLocation: true,
      city: "",
      state: "",
      zip: "",
      position: null,
      listeners: [],
      map: null,
      locations: null,
      location_songs: null,
      top_songs: null,
      top_artists: null,
      showPopup: false,
      popupInfo: {}
    };
  }

  localListeners() {
    apiPost(`/locallisteners`, {
      zip: this.state.position.zip
    }).then(data => {
      try {
        this.setState({
          locations: data.locations,
          location_songs: data.location_songs,
          top_songs: data.top_songs,
          top_artists: data.top_artists
        });
        //Create Markers for songs
        for (var i = 0; i < data.locations.length; i++) {
          var image = {
            url: data.location_songs[i].image_url,
            size: new window.google.maps.Size(40, 40),
            scaledSize: new window.google.maps.Size(40, 40),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(20, 20)
          };
          console.log(data.location_songs[i]);
          var contentString = `
                    <h2><a href="https://open.spotify.com/track/${
                      data.location_songs[i].id
                    }">${data.location_songs[i].name}</a></h2>
                    by
                    <h3><a href="/artist/${data.location_songs[i].artist}"}>${
            data.location_songs[i].artist_name
          }</a></h3>
                    
                    `;
          var infoWindow = new window.google.maps.InfoWindow({
            content: contentString
          });
          var marker = new window.google.maps.Marker({
            position: {
              lat: data.locations[i].latlon[0],
              lng: data.locations[i].latlon[1]
            },
            map: this.state.map,
            icon: image,
            customInfo: {
              infoWindow: infoWindow
            }
          });
          marker.addListener("click", function() {
            this.customInfo.infoWindow.open(this.map, this);
          });
          markers.push(marker);
        }
      } catch (err) {
        console.log(err);
      }
    });
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
    console.log(this.state.showPopup);
  }

  createMap(position) {
    this.setState({
      hasLocation: true
    });
    const map = new window.google.maps.Map(document.getElementById("map"), {
      center: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      zoom: 14,
      disableDefaultUI: true,
      styles: Map
    });

    this.setState({
      map: map
    });

    this.localListeners();
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          var lat = position.coords.latitude;
          var lon = position.coords.longitude;
          var rdl = [
            Math.random() * 0.00724637681 - Math.random() * 0.00724637681,
            Math.random() * 0.00724637681 - Math.random() * 0.00724637681
          ];
          var last_location = [lat + rdl[0], lon + rdl[1]];

          apiGet(`/getaddress?lat=${lat}&lon=${lon}`)
            .then(data => {
              var tposition = {
                coords: position.coords,
                city: null,
                state: null,
                zip: null
              };

              if (data.success) {
                tposition.city = data.address.city;
                tposition.state = data.address.state;
                tposition.zip = data.address.zip;

                this.setState({
                  position: tposition,
                  city: data.address.city,
                  state: data.address.state
                });
                this.createMap(tposition);
              }
            })
            .catch(error => {
              console.log(error);
            })
            .then(() => {
              if (this.state.position) {
                const body = {
                  last_location: last_location,
                  position: this.state.position
                };
                console.log(body);
                console.log(last_location);
                apiPost("/sethome", body)
                  .then(data => {})
                  .catch(error => {
                    console.log(error);
                  });
              }
            });
        },
        error => {
          this.setState({
            hasLocation: false
          });
        }
      );
    } else {
      apiGet("/gethome")
        .then(data => {
          if (data.success) {
            var position = {
              coords: {
                latitude: data.position[0],
                longitude: data.position[1]
              },
              zip: data.zip,
              city: data.city,
              state: data.state
            };
            this.createMap(data.position);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    setInterval(() => {
      if (!this.state.map) return;
      /*this.localListeners(() => {
                /*if (last_marker)
                    last_marker.setMap(null);
                marker_index = (marker_index+1)%marker_indexer.length;
                if (markers.length <= 0) {
                    return;
                }
                last_marker = markers[marker_indexer[marker_index]]
                last_marker.setMap(this.state.map);
                */

      //});
    }, 6000);
  }

  render() {
    const {
      redirect,
      hasLocation,
      position,
      top_songs,
      top_artists,
      city,
      state,
      showPopup
    } = this.state;
    if (redirect) {
      return <Redirect to="/login" />;
    }

    if (hasLocation) {
      return (
        <div className="SongMap">
          <div id="map-container">
            <div id="map">
              <div className="center">
                <img id="loader" src={loader} alt="Loading..." />
              </div>
            </div>
            {state && city && (
              <Player
                location={city + ", " + state}
                top_songs={top_songs}
                top_artists={top_artists}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="center">
            In order to use the map, you need to allow
            <br /> location permissions for this site.
          </h3>
          <br />
        </div>
      );
    }
  }
}
