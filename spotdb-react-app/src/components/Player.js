import React, { Component } from 'react';
import { apiGet, apiPost } from '../util/api';
import '../layouts/Player.css';

export default class Player extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cover_image: "",
            song: "",
            artist: "",
            listeners: 0,
            song_id: null,
            location: ""
        }
    }

    componentWillMount() {
        apiGet(`/listening`).then((data) => {
            try {
                this.state.artist = data.user.item.album.artists[0].name
                this.state.song = data.user.item.name;
                this.state.cover_image = data.user.item.album.images[0].url;
                this.state.song_id = data.user.item.id;
            } catch (err) {}
        }).catch((error)=> {
            console.log(error);
        })
        
        setInterval (() => {
            this.update();
        }, 2000)
    }

    componentDidMount() {
        this.setState({location: this.props.location});
    }

    update() {
        apiGet(`/listening`).then((data) => {
            try {
                var artist = data.user.item.album.artists[0].name;
                var song = data.user.item.name;
                var cover_image = data.user.item.album.images[0].url;
                var song_id = data.user.item.id;
                this.setState({artist: artist, song: song, cover_image: cover_image, song_id: song_id});
            } catch (err) {}
        }).catch((error)=> {
            console.log(error);
        })
        /* Todo, shorten to 1 call */
        apiPost(`/currentlisteners`, {song_id: this.state.song_id}).then((data) => {
            try {
                this.setState({listeners: data.listeners});
            } catch (err) {}
        }).catch((error)=> {
            console.log(error);
        })
    }

    render () {
        const { song, artist, cover_image, listeners, location} = this.state;
        var style = {
            fontSize: '10px',
            margin: '0',
            display: 'inline'
        }

        return (
            <div className="player-container">
                <div className="player-panel">
                    <div className="player-header">
                        <img className='player-song-image' src={cover_image}/>
                        <br/>
                            {song && artist &&
                                <div className="player-song">
                                    {song}<div className="player-song-artist">{artist}</div>
                                </div>
                            }
                    </div>
                    <div className="player-body">
                            {listeners > 0 && cover_image != "" &&
                                <div>{listeners}<br/>SpotDB users listening to this song</div>
                            }

                            {this.props.location}
                    </div>
                </div>
            </div>
        )
    }
}