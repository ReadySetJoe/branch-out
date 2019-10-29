import React from 'react';
import axios from 'axios';
// import * as os from 'os';
import './App.css';
import Player from "./Player";
//import {geolocated} from "react-geolocated";
import SpotifyWebApi from 'spotify-web-api-js';
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
console.log(hash)
const token = hash.access_token;
if (token) {
  spotifyApi.setAccessToken(token);
  console.log('access token set!')
}
window.location.hash = "";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      token: null,
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
      top_artists: [],
    };
  
    // const params = this.getHashParams();
    // const token = params.access_token;
    // if (token) {
    //   spotifyApi.setAccessToken(token);
    // }
    // this.state = {
    //   loggedIn: token ? true : false,
    //   nowPlaying: {
    //     name: 'not checked',
    //     image: ''
    //   },
    //   topArtists: [],
    //   topArtistEvents: [],
      // coords: {
      //   latitude,
      //   longitude,
      //   altitude,
      //   accuracy,
      //   altitudeAccuracy,
      //   heading,
      //   speed,
      // }
    // }

    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }


  getCurrentlyPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((data) => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms,
        });
        console.log(data)
      })
      .catch(error => {
        console.log(error)
        console.log(this.state)      
      })
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;
    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
    }
    this.getCurrentlyPlaying()
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        console.log(response)
        console.log(this.state)
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
    })
    .catch(error => {
      console.log(error)
      console.log(this.state)      
    })
  }

  getTopArtists() {
    spotifyApi.getMyTopArtists()
    // .then((response) => console.log(response))
    .then((response) => {
      this.setState({
        top_artists: response.items.map(artist => artist.name)
      })
    })
  }

  // getMyLocation() {
  //     if (navigator.geolocation) {
  //         navigator.geolocation.getCurrentPosition(showPosition, showError);
  //     } else {
  //         var x = document.getElementById("location");
  //         x.innerHTML = "Geolocation is not supported by this browser.";
  //     }
  // }

//   showPosition(position) {
//     var x = document.getElementById("location");
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude; 
//     var latlon = position.coords.latitude + "," + position.coords.longitude;


//     $.ajax({
//       type:"GET",
//       url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=pLOeuGq2JL05uEGrZG7DuGWu6sh2OnMz&latlong="+latlon,
//       async:true,
//       dataType: "json",
//       success: function(json) {
//                   console.log(json);
//                   var e = document.getElementById("events");
//                   e.innerHTML = json.page.totalElements + " events found.";
//                   showEvents(json);
//                   initMap(position, json);
//                },
//       error: function(xhr, status, err) {
//                   console.log(err);
//                }
//     });

// }

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

//   render() {

//     return (
//       <>

//       {/* <button onClick={() => this.spotifyLogin()}>Log in to Spotify</button>
//       <button onClick={() => this.getNowPlaying()}>get now playing</button>
//       <div>{this.state.nowPlaying.name}:</div>
//       <div>
//         <img src={this.state.nowPlaying.image} style={{width: 100}}></img>
//       </div> */}
// {/* 
//       <button onClick={() => this.getTopArtists()}>get top artists</button>
//       <div>{this.state.topArtists}</div>

//       <button onClick={() => this.getTopArtistEvents()}> get top artist events </button>
//       <div>{this.state.topArtistEvents}</div>

//       <button onClick={() => this.getMyLocation()}>get user location</button>

//       <div></div> */}
//       </>
//   )};
// }

render() {
  return (
    <div className="App">
      <header className="App-header">
      <nav><ul>
        </ul></nav>
      {!this.state.token && (
        <a
          className="btn btn--loginApp-link"
          href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
        </a>
      )}
      {this.state.token && (
        <Player
          item={this.state.item}
          is_playing={this.state.is_playing}
          progress_ms={this.progress_ms}
        />
      )}
      <br/>
      <br/>
      <br/>
      <button onClick={() => this.getTopArtists()}>get top artists</button>
      <div>{this.state.top_artists}</div>

      </header>
    </div>
  );
  }
}

export default App;
