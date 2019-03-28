import React, {Component} from 'react';
import '../layouts/SongMap.css';
import loader from '../assets/loader.svg';
import Map from '../layouts/MapTheme';
import { apiPost, apiGet } from '../util/api';
import { Redirect } from 'react-router-dom';
import Player from '../components/Player';

let location_marker;
let marker_indexer = [];
let markers = {};
let marker_index = 0;
let last_marker = null;

export default class SongMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            hasLocation: true,
            city: '',
            state: '',
            zip: '',
            position: {city: null, state: null},
            listeners: [],
            map: null,
            locations: null,
            location_songs: null,
            top_songs: null,
            top_artists: null
        };
    }

    localListeners(callback) {
        apiPost(`/locallisteners`, {
            zip: this.state.position.zip
        }).then((data) => {
            try {
                this.setState({
                    locations: data.locations,
                    location_songs: data.location_songs,
                    top_songs: data.top_songs,
                    top_artists: data.top_artists
                });
                //Create Markers for songs
                for (var i = 0; i < data.locations.length; i++) {
                    
                    console.log(data.location_songs[i].name)
                    var image = {
                        url: data.location_songs[i].image_url,
                        size: new window.google.maps.Size(40, 40),
                        scaledSize: new window.google.maps.Size(40, 40),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(20, 20)
                    };
                    var marker = new window.google.maps.Marker({
                        position: {
                            lat: data.locations[i].latlon[0],
                            lng: data.locations[i].latlon[1]
                        },
                        map: this.state.map,
                        icon: image
                    });
                    if (!markers[data.location_songs[i].name]) {
                        marker_indexer.push(data.location_songs[i].name);
                    }
                    markers[data.location_songs[i].name] = marker;
                }
                callback();
            } catch (err) {
                console.log(err);
            }
        });
    }


    createMap(position) {
        this.setState({
            hasLocation: true
        });
        const map = new window.google.maps.Map((document.getElementById('map')), {
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
        apiGet(`/authenticate`).then((data) => {
            console.log(data);
            if (!data.success) {
                this.state.redirect = true;
                const {
                    history
                } = this.props
                history.pushState(null, '/login');
            }
        }).catch((error) => {
            console.log(error);
        })
    }



    componentDidMount() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    var lat = position.coords.latitude;
                    var lon = position.coords.longitude;
                    var last_location = [lat, lon]

                    apiGet(`/getaddress?lat=${lat}&lon=${lon}`).then((data) => {
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
                                position: tposition
                            });
                            this.createMap(tposition);
                        }
                    }).catch((error) => {
                        console.log(error);
                    }).then(() => {
                        const body = {
                            last_location: last_location,
                            position: this.state.position
                        }
                        //Update users last location
                        console.log(body);
                        if (this.state.position)
                        apiPost('/sethome', body).then((data) => {
                            console.log(data);
                        }).catch((error) => {
                            console.log(error);
                        })
                    })

                },
                (error) => {
                    this.setState({
                        hasLocation: false
                    });
                }
            )
        } else {
            apiGet('/gethome').then((data) => {
                if (data.success) {
                    var position = {
                        coords: {
                            latitude: data.position[0],
                            longitude: data.position[1]
                        },
                        zip: data.zip,
                        city: data.city,
                        state: data.state
                    }
                    this.createMap(data.position);
                }
            }).catch((error) => {
                console.log(error);
            })
        }

        console.log("before interval");
        setInterval(() => {
            if (!this.state.map)
                return
            console.log('listerner')
            this.localListeners(() => {
                if (last_marker)
                    last_marker.setMap(null);
                marker_index = (marker_index+1)%marker_indexer.length;
                if (markers.length <= 0) {
                    return;
                }
                last_marker = markers[marker_indexer[marker_index]]
                last_marker.setMap(this.state.map);


            });
        }, 6000)
    }

    render() {
        const { redirect, hasLocation, position, top_songs, top_artists} = this.state;
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
                        <Player location={position.city + ', ' + position.state} top_songs={top_songs} top_artists={top_artists} />
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