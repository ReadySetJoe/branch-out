import React from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync} from '@fortawesome/free-solid-svg-icons';
import { faPagelines, faGithub, faLinkedin, faFontAwesome, faSpotify } from '@fortawesome/free-brands-svg-icons';
import skBadgePink from './images/sk-badge-pink.svg';
import poweredBySongkickPink from './images/powered-by-songkick-pink.svg';

import SpotifyWebApi from 'spotify-web-api-js';
import Player from "./Player";
import Modal from "./Modal";
import './App.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const spotifyApi = new SpotifyWebApi();
const SPOTIFY_API_INTERVAL_SECS = 1;
const SPOTIFY_INTERVAL_LIMITER = true;

const SK_AUTH_KEY = 'io09K9l3ebJxmxe2'

// Debug Variables
const API_LIMITER = false; // API Limiter (debug boolean ensuring limited API calling) 
const SAVE_TO_LOCAL_STORAGE = true;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      first_name: '',
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
      intervalID: 0,

      // Artist Selection
      root_artists: [],
      root_artists_selected: [],
      use_now_playing: false,
      use_top_artists: false,
      root_artists_selection_complete: false,

      // Location
      navigator_has_geolocation: false,
      geolocation_complete: false,
      latitude: 0,
      longitude: 0,
      city: '',
      region: '',
      country_code: '',

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

      // Branch
      branch_name: '',
      branch: [],
      preview: "",
      image: null,

      // Database
      limbs_user: [],
      branches_user: [],
      show_modal: false,
    };
    this.myRef = React.createRef();

    this.getNowPlaying = this.getNowPlaying.bind(this);
    this.useTopArtists = this.useTopArtists.bind(this);
    this.useNowPlaying = this.useNowPlaying.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.useMyLocation = this.useMyLocation.bind(this);
    this.findEvents = this.findEvents.bind(this);
    this.addNowPlayingToList = this.addNowPlayingToList.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.makeLimbs = this.makeLimbs.bind(this);
    this.makeBranch = this.makeBranch.bind(this);
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
    this.handleLimbDelete = this.handleLimbDelete.bind(this);
    this.handleBranchDelete = this.handleBranchDelete.bind(this);
    
  }

  componentDidMount() {
    // Generates random branch name
    const NAME_ADJ = [	'accessible',	'accomplished',	'ambitious',	'assured',	'bangin',	'beautiful',	'blissful',	'bold',	'breathtaking',	'brilliant',	'catchy',	'cerebral',	'classic',	'clean',	'clever',	'cleverly-written',	'cohesive',	'complex',	'conceptual',	'danceable',	'definitive',	'deftly-produced',	'delightful',	'dynamic',	'ebullient',	'eclectic',	'ecstatic',	'effortless',	'emotionally-rich',	'endlessly-playable',	'enigmatic',	'enterntaining',	'epic',	'ethereal',	'exceptional',	'exhilarating',	'expansive',	'notable',	'nuanced',	'number',	'operatic',	'passionate',	'percussion-saoked',	'perfect',	'piercing',	'playful',	'poetic',	'poignant',	'polished',	'primal',	'progressive',	'radical',	'raw',	'refined',	'refrain',	'relentless',	'reliably-solid',	'reverbed',	'rhythimic',	'riotous',	'riveting',	'rollicking',	'satisfying',	'saturated',	'sculptural',	'seductive',	'sensitive',	'skilled',	'skillful',	'soaring',	'solid',	'sombre',	'sonic',	'sophisticated',	'feel-good',	'finely-calibrated',	'flawless',	'fluid',	'focused',	'fresh',	'funky',	'grandiose',	'groundbreaking',	'harmonic',	'harmonically-rich',	'headbanging',	'heartfelt',	'hi-fi',	'highly-listenable',	'highly-recommended',	'hypnotic',	'indulgent',	'innocent',	'instrospective',	'instrumental',	'intoxicating',	'inventice',	'invigorating',	'inviting',	'latest',	'layered',	'limitless',	'listenable',	'lush',	'lyrical',	'masterful',	'mesmerizing',	'midtempo',	'moody',	'musical',	'mythical',	'sprawling',	'staccato',	'stratospheric',	'strident',	'striking',	'studied',	'stunning',	'stylish',	'stylistic',	'sublime',	'successful',	'surprising',	'symphonic',	'synthetic',	'talented',	'tender',	'textured',	'thrilling',	'throbbing',	'thunderous',	'tight',	'timeless',	'top-flight',	'trademark',	'trailblazing',	'transcendent',	'transporting',	'unexpected',	'unfied',	'unique',	'unpredictable',	'unsung',	'upbeat',	'visionary',	'vocal',	'well-rounded',	'well-tooled',]
    const NAME_NOUN = [	'Alder',	'Apple',	'Ash',	'Aspen',	'Basswood',	'Birch',	'Buckeye',	'Buckthorn',	'California-laurel',	'Catalpa',	'Cedar',	'Cherry',	'Chestnut',	'Chinkapin',	'Cottonwood',	'Cypress',	'Dogwood',	'Douglas-fir',	'Elm',	'Filbert',	'Fir',	'Giant',	'Hawthorn',	'Hazel',	'Hemlock',	'Holly',	'Honeylocust',	'Horsechestnut',	'Incense-cedar',	'Juniper',	'Larch',	'Locust',	'Madrone',	'Maple',	'Mountain-ash',	'Mountain-mahogany',	'Oak',	'Oregon-myrtle',	'Pear',	'Pine',	'Plum',	'Poplar',	'Redcedar/Arborvitae',	'Redwood',	'Russian-olive',	'Spruce',	'Sweetgum',	'Sycamore',	'Tanoak',	'Walnut',	'White-cedar',	'Willow',	'Yellow-poplar',	'Yew',]
    
    const BRANCH_ADJ_1 = NAME_ADJ[Math.floor(Math.random() * NAME_ADJ.length)];
    const BRANCH_ADJ_2 = NAME_ADJ[Math.floor(Math.random() * NAME_ADJ.length)];
    const BRANCH_NOUN = NAME_NOUN[Math.floor(Math.random() * NAME_NOUN.length)];

    this.setState({branch_name: `${BRANCH_ADJ_1.toLowerCase()}-${BRANCH_ADJ_2.toLowerCase()}-${BRANCH_NOUN.toLowerCase()}`})

    // Setting interval for automated getNowPlaying() calls
    if (!SPOTIFY_INTERVAL_LIMITER) {
      let intervalID = setInterval(() => this.getNowPlaying(), SPOTIFY_API_INTERVAL_SECS * 1000);
      this.setState({intervalID: intervalID})  
    }

    // Check for Geolocation in Navigator
    this.setState({navigator_has_geolocation: "geolocation" in navigator})

    // Get IP Location (not perfectly accurate but quick and easy)
    axios.get('http://ip-api.com/json')
    .then((res) => {
      console.log('IP lookup', res);
      this.setState({
        latitude: res.data.lat,
        longitude: res.data.lon,
        city: res.data.city,
        region: res.data.region,
        country_code: res.data.countryCode,
      })
      this.findEvents()
    })
    .catch((err) => console.log(err))

    // Reloads user, based on token stored in state
    if (!this.state.token) {
      axios.get(`/api/v1/user-social-auth/`)
        .then(res => {
          console.log('Check for login:', res)
          spotifyApi.setAccessToken(res.data[0].extra_data.access_token)
          this.getNowPlaying()
          this.setState({
            token: res.data[0].extra_data.access_token,
            first_name: res.data[0].user.first_name,
            uid: res.data[0].uid,
            id: res.data[0].id,
          });
          axios.get(`/api/v1/branches/`)
            .then(res => {console.log('User Branches:', res); this.setState({ branches_user: res.data });})
            .catch(err => console.log(err))
          axios.get(`/api/v1/limbs/`)
            .then(res => { console.log('User Limbs:', res); this.setState({ limbs_user: res.data });})
            .catch(err => { console.log(err) })
        })
        .catch(err => {console.log(err)})
    } else {
      this.getNowPlaying()
    }
  }
 
 componentWillUnmount() {
    // use intervalID from the state to clear the interval
    clearInterval(this.state.intervalID);
 }

  getNowPlaying() {
    spotifyApi.getMyCurrentPlaybackState()
      .then(data => {
        if (data) {
          this.setState({
            item: data.item,
            is_playing: data.is_playing,
            progress_ms: data.progress_ms,
            // use_now_playing: false,
          });
        }
        console.log('getNowPlaying returned:', data)
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
      .then(res => {
        console.log('Artists Related to Now Playing:', res)
        let root_artists = [...this.state.root_artists]
        root_artists = root_artists.concat(res.artists)
        this.setState({
          root_artists: root_artists,
          use_now_playing: true,
          use_top_artists: false
        })
      })
      .catch(err => console.log(err))
      .finally(() => {
        spotifyApi.getArtist(this.state.item.artists[0].id)
        .then(res => {
          console.log('Also, Now Playing Artist:', res)
          let root_artists = [...this.state.root_artists]
          root_artists.unshift(res)
          this.setState({
            root_artists: root_artists,
          })        
        })
      })
  }

  useTopArtists() {
    spotifyApi.getMyTopArtists()
      .then(data => {
        console.log('Top Artists: ', data)
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

  findArtists() {
    for (let i = 0; i < this.state.root_artists_selected.length; i++) {
      spotifyApi.getArtistRelatedArtists(this.state.root_artists_selected[i].id)
        // eslint-disable-next-line no-loop-func
        .then(res => {
          let artists_all = [...this.state.artists_all]
          artists_all = artists_all.concat(res.artists)
          this.setState({ artists_all: artists_all })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => {
          if (i === this.state.root_artists_selected.length-1) { // last pull
            console.log(`# of artists found: ${this.state.artists_all.length}`)
          }
        })
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
          geolocation_complete: true,
          events_all: [],
        });
        self.findEvents();
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
          for (let i = 1; i < num_calls; i++) {
            // Call the next page
            axios({
              method: 'get',
              url: `https://api.songkick.com/api/3.0/events.json?apikey=${SK_AUTH_KEY}&location=geo:${this.state.latitude},${this.state.longitude}&page=${i + 1}`,
              // eslint-disable-next-line no-loop-func
            })
              .then(res => {
                // Add the events to state
                let events_all = [...this.state.events_all]
                events_all = events_all.concat(res.data.resultsPage.results.event)
                this.setState({ events_all: events_all })

                // Add all artists to state (COULD BE REFACTORED WITH MAP)
                let events_artists = [...this.state.events_artists];
                for (let i = 0; i < this.state.events_all.length; i++) {
                  let e = this.state.events_all[i];
                  for (let j = 0; j < e.performance.length; j++) {
                    if (!events_artists.includes(e.performance[j].artist)) {
                      events_artists.push(e.performance[j].artist)
                    }
                  }
                }
                this.setState({ events_artists: events_artists })
              })
              .catch(err => console.log(err))
              .finally(() => {
                if (i === num_calls-1) {
                  console.log('Events Found:', this.state.events_all)
                  console.log('Performing Artists Found:', this.state.events_artists)
                }
              })
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        if (API_LIMITER) {
          console.log('Events Found:', this.state.events_all)
          console.log('Performing Artists Found:', this.state.events_artists)
        }
      })
  }

  makeLimbs() {
    let events_all = [...this.state.events_all]
    let artists_all = [...this.state.artists_all]
    for (let i = 0; i < artists_all.length; i++) {
      let a = artists_all[i];
      for (let j = 0; j < events_all.length; j++) {
        let b = events_all[j];
        for (let k = 0; k < b.performance.length; k++) {
          let c = b.performance[k];
          if (a.name === c.artist.displayName) {
            spotifyApi.getArtistTopTracks(a.id, "ES")
            // eslint-disable-next-line no-loop-func
            .then(res => {
              console.log(a, res.tracks[0], b)
              let limbs = [...this.state.limbs]
              limbs.push({ artist: a, song: res.tracks[0], event: b})
              this.setState({ limbs: limbs })
            })
            .catch(err => console.log(err))
          }
  
        }
      }
    } 
  }

  makeBranch(e) {
    e.preventDefault()
    let branches_user = [...this.state.branches_user]
    branches_user.push(this.state.branch)
    this.setState({branches_user: branches_user})

    let branch_data = new FormData();
    if (this.state.image) {branch_data.append('cover', this.state.image)}
    let limbs = []
    for (let i = 0; i < this.state.limbs.length; i++) {
      let limb = {
        artist_url: this.state.limbs[i].artist.external_urls.spotify,
        artist_id: this.state.limbs[i].artist.id,
        artist_name: this.state.limbs[i].artist.name,
        event_id: this.state.limbs[i].event.id,
        event_uri: this.state.limbs[i].event.uri,
        event_name: this.state.limbs[i].event.displayName,
        event_city: this.state.limbs[i].event.location.city,
        event_date: this.state.limbs[i].event.start.date,
        venue_name: this.state.limbs[i].event.venue.displayName,
        venue_id: this.state.limbs[i].event.venue.id,
        venue_url: this.state.limbs[i].event.venue.uri,
        song_url: this.state.limbs[i].song.external_urls.spotify,
        song_name: this.state.limbs[i].song.name,
        song_preview_url: this.state.limbs[i].song.preview_url,
      }
      limbs.push(limb)
    }
    limbs = JSON.stringify(limbs)

    branch_data.append('limbs', limbs)

    axios({
      method: 'post',
      url: '/api/v1/branch/',
      data: branch_data,
      config: {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  handleBranchDelete(branch) {
    axios.delete(`/api/v1/branch/${branch.id}/`)
    .then(res => {
      let branches_user = [...this.state.branches_user]
      let ndx = branches_user.indexOf(branch)
      branches_user.splice(ndx,1) 
      this.setState({branches_user})
    })
    .catch(error => {
      console.log(error)
    })
  }

  handleLimbDelete(limb) {
    axios.delete(`/api/v1/limb/${limb.id}/`)
    .then(res => {console.log(res)})
    .catch(error => {console.log(error)})
    .finally(() => {
      let limbs = [...this.state.limbs]
      let ndx = limbs.indexOf(limb)
      limbs.splice(ndx,1) 
      this.setState({limbs})}
    )

  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  handleImageChange(e) {
    let file = e.target.files[0];
    // console.log(file)
    this.setState({image: file});
    
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({preview: reader.result})
    };

    reader.readAsDataURL(file);
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
    state.first_name = this.state.first_name;
    state.zipcode = this.state.zipcode;
    state.uid = this.state.uid;
    state.id = this.state.id;
    state.show_modal = this.state.show_modal;
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
        <img className="root-artist-img" src={artist.images[0].url} alt={`profile for ${artist.name}`}></img>
        {artist.name}
      </button>
    )

    let limbs = this.state.limbs.map((limb, id) =>
      <div key={id} className="limb d-flex align-text-center">
        <div>{id + 1}</div>
        <div className="col-3 text-left"><a target="_blank" rel="noopener noreferrer" href={limb.artist.external_urls.spotify}>{limb.artist.name}</a></div>
        <div className="col-3 text-left"><a target="_blank" rel="noopener noreferrer" href={limb.song.external_urls.spotify}>{limb.song.name}</a></div>
        <div className="col-2"><a target="_blank" rel="noopener noreferrer" href={limb.event.venue.uri}>{limb.event.venue.displayName}</a></div>
        <div className="col-1"><a target="_blank" rel="noopener noreferrer" href={limb.event.uri}>get tix</a></div>
        <div className="col-2">{limb.event.location.city.replace(", US", "")}</div>
        <div>{limb.event.start.date.slice(5, limb.event.start.date.length)}</div>
        <button className="btn-delete" onClick={() => this.handleLimbDelete(limb)}>x</button>
      </div>
    )

    let limbs_table =
      <div className="limbs">
        <div className="limb font-weight-bolder">
          <div>#</div>
          <div className="col-3 text-left">Artist</div>
          <div className="col-3 text-left">Top Song</div>
          <div className="col-2">Venue</div>
          <div className="col-1">Tickets</div>
          <div className="col-2">City</div>
          <div>Date</div>
        </div>
        {limbs}
      </div>

    return (
      <div className="App">
        <header className="App-header">
          {SAVE_TO_LOCAL_STORAGE && (
            <div style={{ position: "fixed", bottom: 60, right: 5, }}>
              <button className='btn' onClick={() => this.save()}>save</button>
              <button className='btn' onClick={() => this.load()}>load</button>
            </div>
          )}

          <Modal 
            show={this.state.show_modal}
            branches={this.state.branches_user}
            limbs={this.state.limbs_user}
            handleClose={() => this.setState({show_modal: false})}
          />
          
          <h1 className={`${this.state.token ? ('title') : ('title title-login')}`}>branch.out</h1>
          <nav className="scrollspy-placeholder fixed-left"><ul></ul></nav>
          {this.state.token && (
            <div>
              <div className="top-bar fixed-top d-flex align-items-center justify-content-between p-2">
                <h4 className="">Hey, {this.state.first_name}</h4>

                <div className="top-right-btns">
                  <button type="button" className="btn btn-primary" onClick={() => this.setState({ show_modal: true })}>
                    My Branches ({this.state.branches_user.length})
                  </button>
                  <a href="/accounts/logout/" className='btn-logout btn m-2'>Logout</a>
                </div>

              </div>
            </div>
          )}

          <footer className="bottom-bar fixed-bottom d-flex align-items-center justify-content-between p-2">
            <div className="ccs-thank-you mr-5 text-left">Created at <a href="https://carolinacodeschool.org/">Carolina Code School</a><br/>Presented Nov, 15th 2019</div>
            <div className="created-by">branch.out was made by Joe Powers, more of my stuff here:
              <a className="mx-1" href="https://github.com/ReadySetJoe"><FontAwesomeIcon icon={faGithub} /></a>
              <a className="mx-1" href="https://www.linkedin.com/in/joe-powers/"><FontAwesomeIcon icon={faLinkedin} /></a>              
            </div>
            <div className="citations ml-5 d-flex flex-row align-items-center">
              <span>API:</span>
              <div className="citations-api text-left mx-2">
                <div className="citation-spotify"><a href="https://developer.spotify.com/">Spotify <FontAwesomeIcon icon={faSpotify}/></a></div>
                <div className="citation-songkick"><a href="https://www.songkick.com/developer">Songkick <img className="songkick-badge-img" alt="songkick badge" src={skBadgePink}/></a></div>
              </div>
              Style:
              <div className="citations-style text-left mx-2">
                <div className="citation-fontawesome"><a href="https://fontawesome.com/">Font Awesome <FontAwesomeIcon icon={faFontAwesome}/></a></div>
                <div className="citation-style"><a href="https://github.com/JoeKarlsson/react-spotify-player">Joe Karlssons <FontAwesomeIcon icon={faGithub}/></a></div>
              </div>
            </div>

          </footer>

          {!this.state.token && (
            <div className="my-5">
              <a className="btn btn--loginApp-link" href="/social/login/spotify/">Login to Spotify</a>
            </div>
          )}

          {this.state.token && (
            <div className="w-100">
              <section className='player-wrapper justify-content-center'>
                {this.state.item.album.images[0].url ? (
                  <Player
                    item={this.state.item}
                    is_playing={this.state.is_playing}
                    progress_ms={this.state.progress_ms}
                  />
                ) : (
                    <div>
                      <h3>Let's get started.</h3>
                      <div>To make sure your Spotify is connected, play a song (on your phone, or any device)</div>
                    </div>
                  )}
                {SPOTIFY_INTERVAL_LIMITER && (<button className='btn p-1 refresh-btn' onClick={() => this.getNowPlaying()}><span className="p-1"><FontAwesomeIcon icon={faSync} /></span></button>)}
              </section>

              <div className="separator"></div>
              
              <button className={`btn ${this.state.use_now_playing ? 'btn-selected' : ''} `} onClick={() => this.useNowPlaying()}>Use Artists Related to Now Playing</button>
              <button className={`btn ${this.state.use_top_artists ? 'btn-selected' : ''} `} onClick={() => this.useTopArtists()}>Use Your Top Artists</button>
            </div>
          )}


          <section className={`${this.state.use_now_playing || this.state.use_top_artists ? 'animate fadeInRight d-flex flex-column align-items-center' : 'd-none'} `}>
            <h2 className="animate fade-in-right my-4 align-self-baseline ">Please select at least 3 root artists to continue:</h2>
            <div className="d-flex align-items-center">
              <div>
                <button className='btn' onClick={() => this.setState({ root_artists_selected: this.state.root_artists })}>All</button>
                <button className='btn' onClick={() => this.setState({ root_artists_selected: [] })}>None</button>
              </div>

              <div>{root_artists}</div>
            </div>
            <div>
              <button
                onClick={() => {
                  if (this.state.root_artists_selected.length >= 3) {
                    this.setState({ root_artists_selection_complete: true });
                    this.findArtists();
                  }
                }}
                className={`mt-5 
                ${this.state.root_artists_selected.length >= 3 ? 'btn' : 'btn-disabled'} 
                ${this.state.root_artists_selection_complete ? 'btn-selected' : ''}
                `}
              >Continue Using These Artists</button>
            </div>
          </section>

          {this.state.root_artists_selection_complete && (
            <section className='location d-flex justify-content-center animate fadeInLeft'>
              <div className={`location-ip m-4 ${this.state.city !== '' ? (''): ('d-none')}`}>
                <h3 className="">Based on your IP address, your location is:</h3>
                <h2><i>{`${this.state.city}, ${this.state.region}, ${this.state.country_code}`}</i></h2>
              </div>

              <div className={`location-geo m-4 ${this.state.navigator_has_geolocation ? 'd-flex flex-column' : 'd-none'}`}>
                <h4>Not your location? Click below for a better guess:</h4>
                {!this.state.geolocation_complete ? 
                (<button className="btn" onClick={this.useMyLocation}>Find My Location</button>)
                 : (<button className="btn btn-selected">Found!</button>)}
              </div>
              <div className={`location-zip m-4 ${!this.state.navigator_has_geolocation ? 'd-flex' : 'd-none'}`}>
                <div>We're sorry, your browser doesn't support geolocation :(</div>
                <div>Location by US zipcode is still currently in development</div>
              </div>
            </section>
          )}

          <div className={` ${this.state.root_artists_selection_complete && this.state.latitude !== 0 ? 'd-flex flex-column' : 'd-none'}`}>
            Let's do the thing
            <button className="btn" onClick={() => this.makeLimbs()}>Begin</button>
            <div># of events found: {this.state.events_all.length}</div>
            <div># of performing artists found: {this.state.events_artists.length}</div>
            <div># of related artists found: {this.state.artists_all.length}</div>
          </div>
          
          {/* <div className="separator"></div> */}

          {this.state.limbs.length > 0 && (
            <section className="animate fadeInUp">
              <header>
                <form  onSubmit={this.makeBranch} className="new-branch-form d-flex flex-row align-items-center justify-content-around">
                  <button type='button' icon="file" onClick={() => this.myRef.current.click()} className="btn branch-img-preview-btn">
                    {this.state.image ? (
                      <img className="branch-img-preview" src={this.state.preview} alt='branch cover preview' width="200" />
                    ) : (
                      <div>
                        <FontAwesomeIcon icon={faPagelines} className="fa-7x"/>
                        <br/>
                        <p>cover image upload</p>
                      </div>
                    )}
                  </button>
                  <input className="d-none" ref={this.myRef} type='file' name='image' onChange={this.handleImageChange}/>             
                  <div className="text-left">
                    <label>Here's your new branch, let's give it a name:</label>
                    <br/>
                    <input className="branch-name-input" name="branch_name" value={this.state.branch_name} onChange={this.handleChange} type="text"/>
                  </div>
                  <button className="btn" type="submit" value="save">Add to My Branches</button>
                </form>
              </header>
              {limbs_table}
            </section>)}
        </header>
      </div>
    );
  }
}

export default App;