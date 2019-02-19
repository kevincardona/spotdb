import React, { Component } from 'react';
import '../layouts/SongMap.css';
import loader from '../assets/loader.svg';
import Map from '../layouts/MapTheme'

export default class SongMap extends Component {
    constructor(props) {
        super(props);
        this.state = {hasLocation: true};
    }
    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
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
                        scaledSize: new window.google.maps.Size(64, 64),
                        // The origin for this image is (0, 0).
                        origin: new window.google.maps.Point(0, 0),
                        // The anchor for this image is the base of the flagpole at (0, 32).
                        anchor: new window.google.maps.Point(32, 64)
                    };
                
                    var overlay;
                    var beachMarker = new window.google.maps.Marker({
                        position: {lat: position.coords.latitude, lng: position.coords.longitude},
                        map: map,
                        icon: image
                    });
                
                },
                (error) => {
                    this.setState({hasLocation: false});
                }
            )
        } else {
            this.setState({hasLocation: false});
        }
    }


 
  render() {
    const hasLocation = this.state.hasLocation;
    if (hasLocation) {
        return (
            <div className="SongMap">
                <div id="map-container">
                    <div id="map">
                        <div className="center">
                            <img id="loader" src={loader} alt="Loading..."/>
                        </div>
                    </div>
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
