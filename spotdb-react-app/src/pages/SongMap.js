import React, { Component } from 'react';
import '../layouts/SongMap.css';
import loader from '../assets/loader.svg';
import Map from '../layouts/MapTheme';
import { apiPost, apiGet } from '../util/api';
import { Redirect } from 'react-router-dom';
import Player from '../components/Player';

export default class SongMap extends Component {
    constructor(props) {
        super(props);
        this.state = {redirect: false, hasLocation: true, city: '', state: '', zip: '', listeners: []};
    }
    createMap(position) {
        this.setState({hasLocation: true});
        const map = new window.google.maps.Map((document.getElementById('map')), {
            center: {lat: position.coords.latitude, lng: position.coords.longitude},
            zoom: 14,
            disableDefaultUI: true,
            styles: Map
        });

        var image = {
            url: 'pin.svg',
            // This marker is 20 pixels wide by 32 pixels high.
            size: new window.google.maps.Size(128, 128),
            scaledSize: new window.google.maps.Size(32, 32),
            // The origin for this image is (0, 0).
            origin: new window.google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at (0, 32).
            anchor: new window.google.maps.Point(16, 32)
        };

        var beachMarker = new window.google.maps.Marker({
            position: {lat: position.coords.latitude, lng: position.coords.longitude},
            map: map,
            icon: image
        });
    }
    componentWillMount() {
        apiGet(`/authenticate`).then((data) => {
            console.log(data);
            if (!data.success) { this.state.redirect=true;
                const { history } = this.props
                history.pushState(null, '/login');
            }
        }).catch((error)=> {
            console.log(error);
        })

        setInterval( () => {
            if (this.state.zip) {
                apiPost(`/locallisteners`, {zip: this.state.zip}).then((data) => {
                    try {
                        this.setState({listeners: data.listeners});
                    } catch (err) {}
                }).catch((error)=> {
                    console.log(error);
                })
            }
        }, 2000);

    }

    componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.createMap(position);
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    var last_location = [lat, lon]

                    apiGet(`/getaddress?lat=${lat}&lon=${lon}`).then((data) => {
                        if (data.success) {
                            var rcity = data.address.city;
                            var rstate = data.address.state;
                            var rzip = data.address.zip;
                            this.setState({city: rcity, state: rstate, zip: rzip});
                        }
                    }).catch((error)=> {
                        console.log(error);
                    }).then (() => {
                        const body = {
                            last_location: last_location,
                            zip: this.state.zip
                        }
                        //Update users last location
                        apiPost('/sethome', body).then((data) => {
                            console.log(data);
                        }).catch((error)=> {
                            console.log(error);
                        })
                    })

                },
                (error) => {
                    this.setState({hasLocation: false});
                }
            )
        } else {
            apiGet('/gethome').then((data) => {
                if (data.success) {
                    var position = {
                        coords: {
                            latitude: data.position[0],
                            longitude: data.position[1]
                        }
                    }
                    this.createMap(data.position);
                }
            }).catch((error)=> {
                console.log(error);
            })
        }
    }

  render() {
    const {redirect, hasLocation, city, state, zip, listeners} = this.state;
    if (redirect) {
        return (
            <Redirect to="/login"></Redirect>
        )
    }

    if (hasLocation) {
        return (
            <div className="SongMap">
                <div id="map-container">
                    <div id="map">
                        <div className="center">
                            <img id="loader" src={loader} alt="Loading..."/>
                        </div>
                    </div>

                    <Player location={city && state && (city + ', ' + state)}/>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                <h3 className="center">In order to use the map, you need to allow<br/> location permissions for this site.</h3>
                <br/>
            </div>
        )
    }
}
}
