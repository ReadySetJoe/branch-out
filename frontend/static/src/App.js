import React from 'react';
import axios from 'axios';
// import * as os from 'os';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
//import {geolocated} from "react-geolocated";
import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Player";
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
// const clientId = os.environ['spotify_client_id'];
const clientId = '45eecc039efd45ad9b8e183c653e2885';
const redirectUri = "http://localhost:3000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
  "user-top-read",
  'playlist-modify-public',
];
// Get the hash of the url
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
const token = hash.access_token;
if (token) {
  spotifyApi.setAccessToken(token);
  console.log(token)
  // axios.post('/api/v1/rest-auth/login/')
}
window.location.hash = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      
      // Now Playing
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0,

      // Artist Selection
      top_artists: [],
      selected_top_artists: [],
      use_currently_playing: true,

      // Limb
      // Songs
      songs: [],

      // Events
      events: [],

    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
    this.getTopArtists = this.getTopArtists.bind(this);
    this.addNowPlayingToList = this.addNowPlayingToList.bind(this);
  }

  componentDidMount() {
    let _token
    axios.get('/api/v1/user-social-auth/')
    .then(res => {
      console.log(res)
      console.log(res.data)
      console.log(res.data[0])
      console.log(res.data[0].extra_data)
      console.log(res.data[0].extra_data.access_token)
      _token = res.data[0].extra_data.access_token
      this.setState({
        token: _token
      });
      spotifyApi.setAccessToken(_token)
    })
    .catch(err => {
      console.log(err)
    })

    this.getCurrentlyPlaying()
    this.getTopArtists()
  }

//   spotifyLogin() {
//     axios.get('social/login/spotify/',
//     href={`${authEndpoint}
//     ?client_id=${clientId}
//     &redirect_uri=${redirectUri}&scope=
//     ${scopes.join("%20")}
//     &response_type=token
//     &show_dialog=true`}
// )
//   }

  getCurrentlyPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
    .then(data => {
      this.setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
      });
      console.log(data)
      axios.post()
    })
    .catch(error => {
      console.log(error)    
    })
  }

  getTopArtists() {
    spotifyApi.getMyTopArtists()
    .then(data => {
      this.setState({
        top_artists: data.items.map(artist => artist.name)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  addNowPlayingToList() {
    let formData = new FormData();
    formData.append('title', this.state.item.name);
    formData.append('artist', this.state.item.album.images[0].url);
    formData.append('url', this.state.item.href);
    formData.append('track_number', this.state.songs.length);
    formData.append('duration_ms', this.state.item.duration_ms);
    localStorage.setItem('formData',formData)
    console.log(formData)

    axios.post('/api/v1/songs/', formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(() => {
      console.log('Current song added to song list!')
    })
    .catch(error => {
      console.log(error)
    })
  }

  // getTopArtistEvents() {
  //   fetch("https://rest.bandsintown.com/artists/"
  //     + this.state.topArtists[1].split(' ').join('%20') 
  //     + '/events?app_id=6a4c5bcaef444a66f8ca08be6adb9be8')
  //     .then(res => res.json())
  //     .then(
  //       (data) => {
  //         console.log(data)
  //         this.setState({
  //           isLoaded: true,
  //           topArtistEvents: data.map(event => [event.lineup[0],'will be playing at',event.venue.name, 'in', event.venue.city, ',', event.venue.region, 'at', event.datetime].join())
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
  // }

render() {
  return (
    <div className="App">
      <header className="App-header">
      <nav><ul>
        </ul></nav>
      {!this.state.token && (
        <div>
          <a
          className="btn btn--loginApp-link"
          href="/social/login/spotify/"
          >
          Login to Spotify (Authorization Code)
          </a>
          <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
          >
          Login to Spotify (Implicit Grant)
          </a>
        </div>
      )}
      <div className='player-wrapper'>
        {this.state.token && (
          <Player
            item={this.state.item}
            is_playing={this.state.is_playing}
            progress_ms={this.state.progress_ms}
          />
        )}
        {this.state.token && (
          <button className='btn p-1 refresh-btn' onClick={() => this.getCurrentlyPlaying()}><span className="p-1"><FontAwesomeIcon icon={faSync} /></span></button>
        )}
      </div>
      <br/>
      <br/>
      <br/>
      <button onClick={() => this.addNowPlayingToList()}>Use This Artist</button>

      <button onClick={() => this.getTopArtists()}>Use Top Artists</button>
      <div>{this.state.top_artists}</div>

      </header>
    </div>
  );
  }
}

export default App;
