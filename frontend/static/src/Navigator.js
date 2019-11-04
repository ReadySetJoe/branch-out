import React from "react";
import "./Navigator.css";
// import Geohash from 'https://cdn.jsdelivr.net/npm/latlon-geohash@2.0.0';

class Navigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      geohash: '',
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

  //   var latlong = this.state.latitude + ',' + this.state.longitude

  //   axios({
  //     type:"GET",
  //     url:`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${TM_API_KEY}&latlong=${latlong}`,
  //     async:true,
  //     dataType: "json",
  //     success: function(json) {
  //                 console.log(json);
  //                 var e = document.getElementById("events");
  //                 e.innerHTML = json.page.totalElements + " events found.";
  //                 showEvents(json);
  //                 initMap(position, json);
  //              },
  //     error: function(xhr, status, err) {
  //                 console.log(err);
  //              }
  //   });

  // getEventsBasedOnLatLong() {

  // }

  // getEventsBasedOnZipCode() {
  //   $.ajax({
  //     type:"GET",
  //     url:`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${TM_API_KEY}`,
  //     async:true,
  //     dataType: "json",
  //     postalcode: this.state.zipcode,
  //     success: function(json) {
  //                 console.log(json);
  //                 // Parse the response.
  //                 // Do other things.
  //              },
  //     error: function(xhr, status, err) {
  //                 // This time, we do not end up here!
  //              }
  //   });
  // }
    
  render () {
    return (
      <div className="App">
        <div className="main-wrapper">
          <div className="navigator__side">
            <div className="navigator__name">

            </div>
            <div className="navigator__artist">

            </div>
            <div className="navigator__status">

            </div>
          </div>
          <div className="navigator__img">

          </div>

        </div>
        
        <div className="d-flex flex-column justify-content-left">
          <div className={` ${"geolocation" in navigator ? 'd-flex flex-column' : 'd-none'}`}>
            <button className="btn" onClick={this.useMyLocation}>Find My Location</button>
            <p>~or~</p>          
          </div>
          <div>Please enter your zip code: <input type='text'></input></div>
        </div>

        <div>{this.state.latitude}, {this.state.latitude}</div>


      </div>



      
    );
  }

}
export default Navigator;