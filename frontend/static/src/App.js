import React from 'react';
import './App.css';
//import {geolocated} from "react-geolocated";
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends React.Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: {
        name: 'not checked',
        image: ''
      },
      topArtists: [],
      topArtistEvents: [],
      // coords: {
      //   latitude,
      //   longitude,
      //   altitude,
      //   accuracy,
      //   altitudeAccuracy,
      //   heading,
      //   speed,
      // }
    }
  }
  
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
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
        topArtists: response.items.map(artist => artist.name)
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


  getTopArtistEvents() {
    fetch("https://rest.bandsintown.com/artists/"
      + this.state.topArtists[1].split(' ').join('%20') 
      + '/events?app_id=6a4c5bcaef444a66f8ca08be6adb9be8')
      .then(res => res.json())
      .then(
        (data) => {
          console.log(data)
          this.setState({
            isLoaded: true,
            topArtistEvents: data.map(event => [event.lineup[0],'will be playing at',event.venue.name, 'in', event.venue.city, ',', event.venue.region, 'at', event.datetime].join())
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
        <a href="/social/login/spotify/">Spotify</a>

        <br/>
        <br/>
        <br/>
        <br/>

          <button onClick={() => this.getNowPlaying()}>get now playing</button>
          <div>{this.state.nowPlaying.name}:</div>
          <div>
            <img src={this.state.nowPlaying.image} style={{width: 100}}></img>
          </div>
{/* 
          <button onClick={() => this.getTopArtists()}>get top artists</button>
          <div>{this.state.topArtists}</div>

          <button onClick={() => this.getTopArtistEvents()}> get top artist events </button>
          <div>{this.state.topArtistEvents}</div>

          <button onClick={() => this.getMyLocation()}>get user location</button>

          <div></div> */}



        </header>
      </div>
  )};
}

export default App;
