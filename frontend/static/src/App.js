import React from 'react';
import axios from 'axios';
import * as os from 'os';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
// import Geocode from 'react-geocode';
// import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Player";
// import Navigator from "./Navigator";
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();

// export const authEndpoint = 'https://accounts.spotify.com/authorize';
// const redirectUri = "http://localhost:8000/";
// const scopes = ["user-read-currently-playing", "user-read-playback-state", "user-read-private", "user-read-email", "user-top-read", 'playlist-modify-public',];

let SK_AUTH_KEY = 'io09K9l3ebJxmxe2'

// API Keys:
const USE_HARD_CODED_VALUES = true
if (!USE_HARD_CODED_VALUES) {
  SK_AUTH_KEY = os.environ['SOMEGUYS_SK_AUTH_KEY']
}

// API Limiter (debug boolean ensuring limited API calling) 
const API_LIMITER = false;

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
        artists: [{ name: "", id: "" }],
        duration_ms: 0,
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
      latitude: 0,
      longitude: 0,
      zipcode: 0,
      use_zipcode: false,
      use_latlong: false,

      // Limb
      // Artists
      artists_all: [],
      artists: [],
      // Events
      events_all: [],
      events_artists: [],
      events: [],
      // Matches
      matches: [],
      // Songs
      songs: [],

    };
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.useTopArtists = this.useTopArtists.bind(this);
    this.useNowPlaying = this.useNowPlaying.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.useMyLocation = this.useMyLocation.bind(this);
    this.findEvents = this.findEvents.bind(this);
    this.addNowPlayingToList = this.addNowPlayingToList.bind(this);
  }

  componentDidMount() {
    if (!this.state.token) {
      let _token
      axios.get(`/api/v1/user-social-auth/`)
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
        this.setState({
          item: {
            album: {
              images: [{ url: "" }]
            },
            name: "",
            artists: [{ name: "", id: "" }],
            duration_ms: 0,
          },
          is_playing: "Spotify Not Currently in use",
          progress_ms: 0,
        });
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
    spotifyApi.getArtist(this.state.item.artists[0].id)
      .then(data => {
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
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
    localStorage.setItem('formData', JSON.stringify(formData))
    localStorage.setItem('state-addnowplaying', JSON.stringify(this.state))
    console.log(formData)

    axios({
      method: 'post',
      url: '/api/v1/songs/',
      config: { headers: { 'content-type': 'multipart/form-data' } },
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
      this.setState({ root_artists_selected: _selected })
    } else {
      let _selected = [...this.state.root_artists_selected]
      _selected.splice(_selected.indexOf(artist), 1)
      this.setState({ root_artists_selected: _selected })
    }
  }

  useMyLocation(e) {
    e.preventDefault()
    let self = this;
    navigator.geolocation.getCurrentPosition(
      function success(position) {
        console.log('latitude', position.coords.latitude,
          'longitude', position.coords.longitude);

        self.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          // geohash: Geohash.encode(position.coords.latitude, position.coords.longitude, 9)
        })
      },
      function error(error_message) {
        // for when getting location results in an error
        console.error('An error has occured while retrieving location', error_message)
      }
    )
  }

  // Old Bandsintown code, possibly still useful
  // getArtistEvents(artist_name) {
  //   console.log('inside get artist events function')
  //   axios({
  //     method: 'get',
  //     url: "https://rest.bandsintown.com/artists/"
  //       + artist_name.split(' ').join('%20')
  //       + `/events?app_id=${BIT_AUTH_KEY}`
  //   })
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  findEvents() {
    // console.log('Starting to look for events')
    // console.log(this.state.root_artists_selected)
    // const artists = this.state.root_artists_selected
    // console.log(artists)
    // var i
    // for (i=0; i<artists.length; i++) {
    //   console.log('Looking for events for ' + artists[i].name)
    //   this.getArtistEvents(artists[i].name)
    // }

    axios({
      method: 'get',
      // url: `https://api.songkick.com/api/3.0/artists/308396/similar_artists.json?apikey=${SOMEGUYS_API_KEY}`,
      url: `https://api.songkick.com/api/3.0/events.json?apikey=${SK_AUTH_KEY}&location=geo:${this.state.latitude},${this.state.longitude}&page=1`,
    })
      .then(res => {
        console.log(res)
        this.setState({ events_all: res.data.resultsPage.results.event })
        if (res.data.resultsPage.totalEntries > res.data.resultsPage.results.event.length & !API_LIMITER) {
          const total_entries = res.data.resultsPage.totalEntries
          const per_page = res.data.resultsPage.perPage
          console.log(`There are ${total_entries} results and ${per_page} on each page`)
          console.log(`Which means the site needs to make ${Math.ceil(total_entries / per_page)} calls total`)
          console.log(`and the last call should have ${total_entries % per_page} entries`)
          const num_calls = Math.ceil(total_entries / per_page)
          let i
          for (i = 1; i < num_calls; i++) {
            axios({
              method: 'get',
              // url: `https://api.songkick.com/api/3.0/artists/308396/similar_artists.json?apikey=${SOMEGUYS_API_KEY}`,
              url: `https://api.songkick.com/api/3.0/events.json?apikey=${SK_AUTH_KEY}&location=geo:${this.state.latitude},${this.state.longitude}&page=${i + 1}`,
              // eslint-disable-next-line no-loop-func
            }).then(res => {
              let events_all = [...this.state.events_all]
              events_all = events_all.concat(res.data.resultsPage.results.event)
              this.setState({ events_all: events_all })

              let i;
              let events_artists = [...this.state.events_artists];
              for (i = 0; i < this.state.events_all.length; i++) {
                let e = this.state.events_all[i];
                let j
                for (j = 0; j < e.performance.length; j++) {
                  if (!events_artists.includes(e.performance[j].artist)) {
                    events_artists.push(e.performance[j].artist)
                  }
                }
              }
              this.setState({events_artists:events_artists})
            })
              .catch(err => {
                console.log(err)
              })
          }
        }
        let i;
        let events_artists = [...this.state.events_artists];
        for (i = 0; i < this.state.events_all.length; i++) {
          let e = this.state.events_all[i];
          let j
          for (j = 0; j < e.performance.length; j++) {
            events_artists.push(e.performance[j].artist)
          }
        }
        this.setState({events_artists:events_artists})
        // console.log({events_artists})
      })
      .catch(err => {
        console.log(err)
      })
  }

  findArtists() {
    let i;
    for (i = 0; i < this.state.root_artists_selected.length; i++) {
      spotifyApi.getArtistRelatedArtists(this.state.root_artists_selected[i].id)
      // eslint-disable-next-line no-loop-func
      .then(res => {
        let artists_all = [...this.state.artists_all]
        artists_all = artists_all.concat(res.artists)
        this.setState({artists_all:artists_all})        
    
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  findMatches() {
    console.log(`There are ${this.state.events_artists.length} artists from events`)
    let events_artists = [...this.state.events_artists];
    const events_artists_unique = [...new Set(events_artists.map(x => x.displayName))];
    console.log(`${events_artists_unique.length} are unique`)

    console.log(`There are ${this.state.artists_all.length} artists from events`)
    let artists_all = [...this.state.artists_all];
    const artists_all_unique = [...new Set(artists_all.map(x => x.name))];
    console.log(`${artists_all_unique.length} are unique`)

    let i, j, a, b, matches = [];
    for (i=0; i<artists_all_unique.length; i++) {
      a = artists_all_unique[i];
      // console.log(a)
      for (j=0; j<events_artists_unique.length; j++) {
        b = events_artists_unique[j]
        // console.log(b)
        if (a===b) {
          matches.push(a)
        }
      }
    }
    console.log(`and there are ${matches.length} matches`)
    console.log(matches)
    this.setState({matches: matches})
  }

  render() {
    let root_artists = this.state.root_artists.map((artist, id) =>
      <button key={id}
        className={`btn root-artist-btn ${this.state.root_artists_selected.includes(artist) ? ('btn-selected') : ('')}`}
        onClick={() => this.selectArtist(artist)}
      >
        {artist.name}
      </button>
    )

    let events = this.state.events.map((event, id) =>
      <div key={id} className="btn m-2">
        {event.something}
      </div>
    )

    return (
      <div className="App">
        <header className="App-header">
          <nav className="scrollspy-placeholder"><ul></ul></nav>
          <div className="position-fixed fixed-top d-flex flex-row-reverse">
            <a href="/logout/" className='logout-btn btn'>Logout</a>
          </div>
          {!this.state.token && (
            <div>
              <a
                className="btn btn--loginApp-link"
                href="/social/login/spotify/"
              >
                Login to Spotify
            </a>
              {/* <a
                className="btn btn--loginApp-link"
                href={`${authEndpoint}?client_id=${SPOTIFY_AUTH_KEY}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
              >
                Login to Spotify (Implicit Grant)
            </a> */}
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
              <br />
              <br />
              <br />
              <button className={`btn ${this.state.use_now_playing ? 'btn-selected' : ''} `} onClick={() => this.useNowPlaying()}>Use Artists Related to Now Playing</button>
              <button className={`btn ${this.state.use_top_artists ? 'btn-selected' : ''} `} onClick={() => this.useTopArtists()}>Use Your Top Artists</button>
            </div>
          )}


          <br />
          <br />
          <br />

          <div className={`${this.state.use_now_playing || this.state.use_top_artists ? 'd-flex align-items-center' : 'd-none'} `}>
          <div>
            <button className='btn' onClick={() => this.setState({root_artists_selected: this.state.root_artists})}>All</button>
            <button className='btn' onClick={() => this.setState({root_artists_selected: []})}>None</button>
          </div>
            
            <div>{root_artists}</div>

          </div>

          <br />
          <br />
          <br />

          <div className={`${this.state.use_now_playing || this.state.use_top_artists ? 'd-flex align-items-center' : 'd-none'} `}>
            <h2 className="m-2">Select at least 3 starting bands to continue</h2>
            <button
              onClick={() => {
                if (this.state.root_artists_selected.length >= 3) {
                  this.setState({ root_artists_selection_complete: true })
                }
              }}
              className={`${this.state.root_artists_selected.length >= 3 ? 'btn' : 'btn-disabled'} ${this.state.root_artists_selection_complete ? 'btn-selected' : ''}`}
            >Continue Using These Bands</button>
          </div>

          <br />
          <br />
          <br />

          <div className={`location ${this.state.root_artists_selection_complete ? 'd-flex' : 'd-none'}`}>
          {/* <div className={`location ${this.state.root_artists_selection_complete ? 'd-flex' : ''}`}> */}
            <div className="d-flex flex-column justify-content-left">
              <div className={` ${"geolocation" in navigator ? 'd-flex flex-column' : 'd-none'}`}>
                <button className="btn" onClick={this.useMyLocation}>Find My Location</button>
                <p>~or~</p>
              </div>
              <div>Please enter your zip code: <input type='text'></input></div>
            </div>

            <div>{this.state.latitude}, {this.state.longitude}</div>

          </div>

          <br />
          <br />
          <br />

          <div className={` ${this.state.root_artists_selection_complete && this.state.latitude !== 0 ? 'd-flex flex-column': 'd-none'}`}>
            Let's do the thing
            <br />
            <button className="btn" onClick={() => this.findEvents()}>Find Events</button>
            # of events found: {this.state.events_all.length} <br />
            # of artist from those events: {this.state.events_artists.length}
            <button className="btn" onClick={() => this.findArtists()}>Find Artists</button>
            <br />
            # of artists found: {this.state.artists_all.length}
            <br />
            <button className="btn" onClick={() => this.findMatches()}>Find Matches</button>
            # of matches found: {this.state.matches.length}

          </div>



        </header>
      </div>
    );
  }
}

export default App;