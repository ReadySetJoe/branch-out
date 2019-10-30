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
const redirectUri = "http://localhost:8000/";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-email",
  "user-top-read",
  'playlist-modify-public',
];
// Get the hash of the url
// const hash = window.location.hash
//   .substring(1)
//   .split("&")
//   .reduce(function(initial, item) {
//     if (item) {
//       var parts = item.split("=");
//       initial[parts[0]] = decodeURIComponent(parts[1]);
//     }
//     return initial;
//   }, {});
// const token = hash.access_token;
// if (token) {
//   spotifyApi.setAccessToken(token);
//   console.log(token)
// }
// window.location.hash = "";

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
        artists: [{ name: "" , id: ""}],
        duration_ms:0,
      },
      is_playing: "Paused",
      progress_ms: 0,

      // Artist Selection
      root_artists: [],
      root_artists_selected: [],
      use_now_playing: false,
      use_top_artists: false,
      root_artists_selection_complete: false,

      // Location

      // Limb
      // Songs
      songs: [],

      // Events
      events: [],

    };
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.useTopArtists = this.useTopArtists.bind(this);
    this.useNowPlaying = this.useNowPlaying.bind(this);
    this.addNowPlayingToList = this.addNowPlayingToList.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.useMyLocation = this.useMyLocation.bind(this)
  }

  componentDidMount() {    
    if (!this.state.token) {
      let _token
      axios.get('/api/v1/user-social-auth/')
      .then(res => {
        // console.log(res)
        // localStorage.setItem('res_token', JSON.stringify(res))
        _token = res.data[0].extra_data.access_token
        this.setState({
          token: _token
        });
        spotifyApi.setAccessToken(_token)
        this.getNowPlaying()
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
    .then(data => {
      this.setState({
        item: data.item,
        is_playing: data.is_playing,
        progress_ms: data.progress_ms,
        use_now_playing: false,
      });
      console.log(data)
    })
    .catch(error => {
      console.log(error)    
    })
  }

  useNowPlaying() {
    spotifyApi.getArtistRelatedArtists(this.state.item.artists[0].id)
    .then(data => {
      this.setState({
        root_artists: data.artists,
        use_now_playing: true, 
        use_top_artists: false
      })
      console.log(data)
    })
    .catch(err => console.log(err))
  }

  useTopArtists() {
    spotifyApi.getMyTopArtists()
    .then(data => {
      this.setState({
        root_artists: data.items,
        use_top_artists: true, 
        use_now_playing: false
      })
    })
    .catch(err => {
      console.log(err)
    })
  }

  addNowPlayingToList() {
    let formData = new FormData();
    formData.append('title', this.state.item.name);
    formData.append('artist', this.state.item.artists[0].name);
    formData.append('url', this.state.item.href);
    formData.append('track_number', this.state.songs.length);
    formData.append('duration_ms', this.state.item.duration_ms);
    localStorage.setItem('formData',JSON.stringify(formData))
    localStorage.setItem('state-addnowplaying',JSON.stringify(this.state))
    console.log(formData)

    axios({
      method: 'post',
      url: '/api/v1/songs/',
      config: {headers: {'content-type': 'multipart/form-data'}},
      data: formData,
    })
    .then(() => {
      console.log('Current song added to song list!')
    })
    .catch(error => {
      console.log(error)
    })
  }

  selectArtist(artist) {
    if (!this.state.root_artists_selected.includes(artist)) {
      let _selected = [...this.state.root_artists_selected]
      _selected.push(artist)
      this.setState({root_artists_selected: _selected})
    } else {
      let _selected = [...this.state.root_artists_selected]
      _selected.splice(_selected.indexOf(artist), 1)
      this.setState({root_artists_selected: _selected})
    }
  }

  useMyLocation() {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(
    function success(position) {
      // for when getting location is a success
      console.log('latitude', position.coords.latitude, 
                  'longitude', position.coords.longitude);
    },
    function error(error_message) {
      // for when getting location results in an error
      console.error('An error has occured while retrieving location', error_message)
      }  
    );
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
  let root_artists = this.state.root_artists.map((artist, id) => 
    <button key={id}
    className={`btn root-artist-btn ${this.state.root_artists_selected.includes(artist) ? ('btn-selected') : ('')}`}
    onClick={() => this.selectArtist(artist)}
    >
    {artist.name}
    </button>
  )

  return (
    <div className="App">
      <header className="App-header">
      <nav className="scrollspy-placeholder"><ul></ul></nav>
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
      {this.state.token && (
        <div>
          <div className='player-wrapper'>
          
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.state.progress_ms}
            />
            <button className='btn p-1 refresh-btn' onClick={() => this.getNowPlaying()}><span className="p-1"><FontAwesomeIcon icon={faSync} /></span></button>
            
          </div>
          <br/>
          <br/>
          <br/>
          <button className={`btn ${this.state.use_now_playing ? 'btn-selected' : ''} `} onClick={() => this.useNowPlaying()}>Use Artists Related to Now Playing</button>
          <button className={`btn ${this.state.use_top_artists ? 'btn-selected' : ''} `} onClick={() => this.useTopArtists()}>Use Your Top Artists</button>
        </div>
      )}

      
      <br/>
      <br/>
      <br/>

      <div>{root_artists}</div>

      <br/>
      <br/>
      <br/>

      <div className={`${this.state.use_now_playing || this.state.use_top_artists ? 'd-flex' : 'd-none'} `}>
        <h2>Select at least 3 starting bands to continue</h2>
        <button 
        onClick={() => {
          if (this.state.root_artists_selected.length >= 3) {
            this.setState({root_artists_selection_complete: true})
          }
        }}
        className={`${this.state.root_artists_selected.length >= 3 ? 'btn' : 'btn-disabled'} ${this.state.root_artists_selection_complete ? 'btn-selected' : ''}`}
        >Continue Using These Bands</button> 
      </div>

      <div className={`location ${this.state.root_artists_selection_complete ? 'd-flex' : 'd-none'}`}>
        <div className={` ${"geolocation" in navigator ? 'd-flex btn' : 'd-none'}`}>
          <button onClick={() => this.useMyLocation()}>Find My Location</button>
          ~or~          
        </div>
        

      </div>



      
      
      </header>
    </div>
  );
  }
}

export default App;
