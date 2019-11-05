import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Player";
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();

const SK_AUTH_KEY = 'io09K9l3ebJxmxe2'

// Debug Variables
const API_LIMITER = true; // API Limiter (debug boolean ensuring limited API calling) 
const SAVE_TO_LOCAL_STORAGE = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      username: '',
      uid: '',
      id: '',

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

      // Artists
      artists_all: [],
      artists: [],
      // Events
      events_all: [],
      events_artists: [],
      events: [],
      // Matches
      matches: [],

      // Limbs
      limbs: [],

      // Branches
      branches: [],
    };
    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.useTopArtists = this.useTopArtists.bind(this);
    this.useNowPlaying = this.useNowPlaying.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.useMyLocation = this.useMyLocation.bind(this);
    this.findEvents = this.findEvents.bind(this);
    this.addNowPlayingToList = this.addNowPlayingToList.bind(this);
    this.makeLimbs = this.makeLimbs.bind(this);
    this.makeBranch = this.makeBranch.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }

  componentDidMount() {
    // Reloads user, based on token stored in state
    if (!this.state.token) {
      axios.get(`/api/v1/user-social-auth/`)
        .then(res => {
          console.log(res)
          let _token = res.data[0].extra_data.access_token
          this.setState({
            token: _token,
            username: res.data[0].user.first_name,
            uid: res.data[0].uid,
            id: res.data[0].id,
          });
          spotifyApi.setAccessToken(_token)
          this.getNowPlaying()
        })
        .catch(err => {
          console.log(err)
        })
    } else {
      this.getNowPlaying()
    }
  }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then(data => {
        if (data) {
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms,
            use_now_playing: false,
          });
        }
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
        let root_artists = data.artists
        root_artists.unshift(this.state.item.artists[0])  
        this.setState({
          root_artists: root_artists,
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
    // Handles selected root artist toggling
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
        self.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      function error(error_message) {
        console.error('An error has occured while retrieving location', error_message)
      }
    )
  }

  findEvents() {
    axios({
      method: 'get',
      url: `https://api.songkick.com/api/3.0/events.json?apikey=${SK_AUTH_KEY}&location=geo:${this.state.latitude},${this.state.longitude}&page=1`,
    })
      .then(res => {
        this.setState({ events_all: res.data.resultsPage.results.event })
        let i;
        let events_artists = [...this.state.events_artists];
        for (i = 0; i < this.state.events_all.length; i++) {
          let e = this.state.events_all[i];
          let j
          for (j = 0; j < e.performance.length; j++) {
            events_artists.push(e.performance[j].artist)
          }
        }
        this.setState({ events_artists: events_artists })


        // If more than 50 events are available, and the first page didn't contain them all
        if (res.data.resultsPage.totalEntries > res.data.resultsPage.results.event.length & !API_LIMITER) {
          const total_entries = res.data.resultsPage.totalEntries
          const per_page = res.data.resultsPage.perPage
          console.log(`There are ${total_entries} results and ${per_page} on each page`)
          console.log(`Which means the site needs to make ${Math.ceil(total_entries / per_page)} calls total`)
          console.log(`and the last call should have ${total_entries % per_page} entries`)
          const num_calls = Math.ceil(total_entries / per_page)
          let i
          for (i = 1; i < num_calls; i++) {
            // Call the next page
            axios({
              method: 'get',
              url: `https://api.songkick.com/api/3.0/events.json?apikey=${SK_AUTH_KEY}&location=geo:${this.state.latitude},${this.state.longitude}&page=${i+1}`,
              // eslint-disable-next-line no-loop-func
            })
            .then(res => {
              // Add the events to state
              let events_all = [...this.state.events_all]
              events_all = events_all.concat(res.data.resultsPage.results.event)
              this.setState({ events_all: events_all })

              // Add all artists to state (COULD BE REFACTORED WITH MAP)
              let i;
              let events_artists = [...this.state.events_artists];
              for (i = 0; i < this.state.events_all.length; i++) {
                let e = this.state.events_all[i];
                let j
                for (j = 0; j < e.performance.length; j++) {
                  events_artists.push(e.performance[j].artist)
                }
              }
              console.log(events_all)
              this.setState({ events_artists: events_artists })
            })
            .catch(err => {
              console.log(err)
            })
          }
        }
        console.log({events_artists})
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
          this.setState({ artists_all: artists_all })
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
    for (i = 0; i < artists_all_unique.length; i++) {
      a = artists_all_unique[i];
      for (j = 0; j < events_artists_unique.length; j++) {
        b = events_artists_unique[j]
        if (a === b) {
          matches.push(a)
        }
      }
    }
    console.log(`and there are ${matches.length} matches`)
    console.log(matches)
    this.setState({ matches: matches })
  }

  makeLimbs() {
    let j = 0;
    let matches = [...this.state.matches]
    let limbs = []

    while (matches.length && j<this.state.artists_all.length) {
      let a = this.state.artists_all[j]
      if (matches.includes(a.name)) {
        spotifyApi.getArtistTopTracks(a.id, "ES")
        .then(res => {
          limbs.push({artist: a, song: res.tracks[0]})
          let i = 0;
          let matches_also = [...this.state.matches]
      
          while (matches_also.length && i<this.state.events_all.length) {
            let e = this.state.events_all[i]
            for (let j=0; j<e.performance.length; j++) {
              if (matches_also.includes(e.performance[j].artist.displayName)) {
                for (let k=0; k<limbs.length; k++) {
                  if (limbs[k].artist.name === e.performance[j].artist.displayName) {
                    limbs[k].event = e
                    limbs.sort((a, b) => b.start.date - a.start.date)
                  }
                }
                matches_also.splice(matches_also.indexOf(e.performance[j].artist.displayName),1)
              }
            }
            i++;
          }
      
          console.log(limbs)
          this.setState({limbs:limbs})
        })
        .catch(err => console.log(err))
        matches.splice(matches.indexOf(a.name),1)
      }
      j++;
    }
  }

  makeBranch() {
    let branch_data = new FormData();
    // branch_data.append('cover', this.state.image) // NEED HELP ON THIS
    branch_data.append('created_by',this.state.uid) // NEED HELP ON THIS
    axios({
      method: 'post',
      url: '/api/v1/branch/',
      data: branch_data,
      config: { 
        headers: {'Content-Type': 'multipart/form-data' }
      }
    })
    .then(res => {
      let branch_id = res.data.id // NEED HELP ON THIS
      for (let i=0; i<this.state.limbs.length; i++) {
        let limb_data = new FormData();
        limb_data.append('artist_url',this.state.limbs[i].artist.external_urls[0])
        limb_data.append('artist_id',this.state.limbs[i].artist.id)
        limb_data.append('artist_name',this.state.limbs[i].artist.name)
        limb_data.append('event_id',this.state.limbs[i].event.id)
        limb_data.append('event_name',this.state.limbs[i].event.displayName)
        limb_data.append('event_city',this.state.limbs[i].event.location.city)
        limb_data.append('event_date',this.state.limbs[i].event.start.date)
        limb_data.append('venue_name',this.state.limbs[i].event.venue.displayName)
        limb_data.append('venue_id',this.state.limbs[i].event.venue.id)
        limb_data.append('venue_url',this.state.limbs[i].event.venue.uri)
        limb_data.append('song_url',this.state.limbs[i].song.external_urls[0])
        limb_data.append('song_name',this.state.limbs[i].song.name)
        limb_data.append('song_preview_url',this.state.limbs[i].song.preview_url)
        limb_data.append('created_by', this.state.uid) // NEED HELP ON THIS
        limb_data.append('branch', branch_id) // NEED HELP ON THIS
        axios({
          method: 'post',
          url: 'api/v1/limb/',
          data: limb_data,
          config: {
            headers: {'Content-Type': 'multipart/form-data'}
          }
        })
      }
    })
    .catch(err => console.log(err))
  }

  save() {
    let state = {}
    state.token = this.state.token;
    state.artists = this.state.artists;
    state.artists_all = this.state.artists_all;
    state.events = this.state.events;
    state.events_all = this.state.events_all;
    state.events_artists = this.state.events_artists;
    state.is_playing = this.state.is_playing;
    state.item = this.state.item;
    state.latitude = this.state.latitude;
    state.limbs = this.state.limbs;
    state.longitude = this.state.longitude;
    state.matches = this.state.matches;
    state.progress_ms = this.state.progress_ms;
    state.root_artists = this.state.root_artists;
    state.root_artists_selected = this.state.root_artists_selected;
    state.root_artists_selection_complete = this.state.root_artists_selection_complete;
    state.use_latlong = this.state.use_latlong;
    state.use_now_playing = this.state.use_now_playing;
    state.use_top_artists = this.state.use_top_artists;
    state.use_zipcode = this.state.use_zipcode;
    state.username = this.state.username;
    state.zipcode = this.state.zipcode;
    localStorage.setItem('state', JSON.stringify(state))
    console.log('State Saved!')
    console.log(state)
  }

  load() {
    let state = JSON.parse(localStorage.getItem('state'))
    this.setState(state)
    console.log('State Loaded!')
    console.log(state)
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

    let limbs = this.state.limbs.map((limb, id) =>
      <div key={id} className="limb d-flex">
        <div className="col-1">{id+1}</div>
        <div className="col-3 text-left">{limb.artist.name}</div>
        <div className="col-4 text-left">{limb.song.name}</div>
        <div className="col-2">{limb.event.location.city}</div>
        <div className="col-2">{limb.event.start.date}</div>
      </div>
    )

    let limbs_table = 
      <div className="limbs">
        <div className="limb font-weight-bolder">
          <div className="col-1">#</div>
          <div className="col-3 text-left">Artist</div>
          <div className="col-4 text-left">Top Song</div>
          <div className="col-2">City</div>
          <div className="col-2">Date</div>
        </div>
        {limbs}
      </div>

    return (
      <div className="App">
        <header className="App-header">
          {SAVE_TO_LOCAL_STORAGE && (
            <div style={{ position: "fixed", bottom: 5, right: 5, }}>
              <button className='btn' onClick={() => this.save()}>save</button>
              <button className='btn' onClick={() => this.load()}>load</button>
            </div>
          )}
          <h1 className="title">branch.out</h1>
          <nav className="scrollspy-placeholder fixed-left"><ul></ul></nav>
          {this.state.token && (
            <div>
              <div className="top-bar fixed-top d-flex align-items-center justify-content-between p-2">
                <h4 className="">Hey, {this.state.username}</h4>
                
                <div>
                  <a href="/limbs/" className="btn m-2">My Limbs ({this.state.limbs.length})</a>
                  <a href="/logout/" className='btn-logout btn m-2'>Logout</a>
                </div>
                
              </div>
            </div>
          )}
          
          <br />
          <br />
          <br />

          {!this.state.token && (
            <div>
              <a
                className="btn btn--loginApp-link"
                href="/social/login/spotify/"
              >
                Login to Spotify
            </a>
            </div>
          )}
          {this.state.token && (
            <div>
              <div className='player-wrapper'>

                {this.state.item.album.images[0].url ? (
                  <Player
                    item={this.state.item}
                    is_playing={this.state.is_playing}
                    progress_ms={this.state.progress_ms}
                  />
                ) : (
                    <div>
                      <div>Let's get started.</div>
                      <div>To make sure your Spotify is connected, play a song (on your phone, or any device) and hit the resync button to make sure you're connected</div>
                    </div>
                  )}
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
              <button className='btn' onClick={() => this.setState({ root_artists_selected: this.state.root_artists })}>All</button>
              <button className='btn' onClick={() => this.setState({ root_artists_selected: [] })}>None</button>
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

          <div className={` ${this.state.root_artists_selection_complete && this.state.latitude !== 0 ? 'd-flex flex-column' : 'd-none'}`}>
            Let's do the thing
            <br />
            <button className="btn" onClick={() => this.findEvents()}>Find Events</button>
            # of events found: {this.state.events_all.length} <br />
            # of artist from those events: {this.state.events_artists.length}
            <br />
            <button className="btn" onClick={() => this.findArtists()}>Find Artists</button>
            # of artists found: {this.state.artists_all.length}
            <br />
            <button className="btn" onClick={() => this.findMatches()}>Find Matches</button>
            # of matches found: {this.state.matches.length}
            <br />
            <button className="btn" onClick={() => this.makeLimbs()}>Make Limbs</button>
            # of limbs made: {this.state.limbs.length}
            <br />
            <button className="btn" onClick={() => this.makeBranch()}>Make Branch</button>
            <br />
          </div>
          <br />
          {this.state.limbs.length > 0 && (
            <div>
              <image alt="upload customized image for this branch"/>
            {limbs_table}
            </div>)}
        </header>
      </div>
    );
  }
}

export default App;