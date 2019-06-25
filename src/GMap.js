import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Map, GoogleApiWrapper, Polygon, Marker, Polyline }  from 'google-maps-react';

import places from "./data/places";


const styleMap = require('./styleMap.json')
const mapStyles = {
  width: 'calc(100% - 40px)',
  height: '100%',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
}

export class GPS extends Component {
  state = {
    lng: null,
    lat: null,
    nearestPlace: null,
    basicPlaceInfos: null,
    isGeolocated: false,
    noNearestPlaceInfos: false,
    polyLinePaths: []
  }

  componentWillMount() {
    if ("geolocation" in navigator) {
      const { google } = this.props;
      let intervalId =  navigator.geolocation.watchPosition(this.successGeoloc, this.errorGeoloc, {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 20000, 
        distanceFilter: 10
      });

      let directionsService = new google.maps.DirectionsService();
      let directionsDisplay = new google.maps.DirectionsRenderer();

      this.setState({
        intervalId,
        directionsService,
        directionsDisplay
      })
    } else {
      alert('Your browser doesn\'t support geolocation API');
    }
  }

  successGeoloc = position => {
    const google = this.props.google;

    const paths = new google.maps.Polygon({paths: [
      new google.maps.LatLng(position.coords.latitude - 0.0003, position.coords.longitude - 0.0003),
      new google.maps.LatLng(position.coords.latitude - 0.0003, position.coords.longitude + 0.0003),
      new google.maps.LatLng(position.coords.latitude + 0.0003, position.coords.longitude + 0.0003),
      new google.maps.LatLng(position.coords.latitude + 0.0003, position.coords.longitude - 0.0003),
    ]});

    setTimeout(() => {
      places.some(place => {
        const placePoint = new google.maps.LatLng(place.position.lat, place.position.lng);
    
        if (google.maps.geometry.poly.containsLocation(placePoint, paths)) {

            this.setState({
              nearestPlace : place,
              isGeolocated: true,
            })
            return true;
        } else {
          console.log(google.maps.geometry.poly.containsLocation(placePoint, paths))
          this.setState({
            nearestPlace: "",
            placeDescription: ""
          })
          return false;
        }
      })

      this.setState({
        lng: position.coords.longitude,
        lat: position.coords.latitude,
        zoom: 16,
        polyLinePaths: [
          {lat: position.coords.latitude - 0.0003, lng: position.coords.longitude - 0.0003},
          {lat: position.coords.latitude - 0.0003, lng: position.coords.longitude + 0.0003},
          {lat: position.coords.latitude + 0.0003, lng: position.coords.longitude + 0.0003},
          {lat: position.coords.latitude + 0.0003, lng: position.coords.longitude - 0.0003}
        ]
      })
    }, 500)
  }

  errorGeoloc = error => {
    switch (error.code) {
      case 0:
        alert('UNKNOWN ERROR');
        break;
      case 1:
        this.setState({
          zoom: 14,
          lat: 44.85,
          lng: -0.560049
        });
        break;
      case 2:
        alert('POSITION UNAVAILABLE ERROR')
        break;
      case 3: 
        alert('TIMED OUT ERROR')
        break;
      default:
        break;
    }
  }

  // getDirectionToPoint = event => {
  //   const { lat, lng, directionsService } = this.state;

  //   this.setState({
  //     gps: null
  //   })

  //   const request = {
  //     origin: {
  //       lat,
  //       lng
  //     },
  //     destination: event.position,
  //     travelMode: 'WALKING'
  //   };

  //   directionsService.route(request, (results, status) => {
  //     if (status === "OK") {

  //       const pathsArray = Object.keys(results.routes[0].overview_path).map((k) => results.routes[0].overview_path[k])

  //       this.setState({
  //         gps: {
  //           path: pathsArray
  //         }
  //       })
  //     } else {
  //         console.log("NOT-GOOD!");
  //     }
  //   })
  // }

  getBasicPlaceInfos = (place) => {
    this.setState({
      basicPlaceInfos: place
    }, () => {
      console.log(this.state.basicPlaceInfos)
    })
  }

  disableNearestPlace(event) {
    event.preventDefault();
    this.setState({ 
      nearestPlace: "",
      noNearestPlaceInfos: true 
    }) 
  } 


  showNearestPlace(event) {
    event.preventDefault();
  }

  render() {
    const { lat, lng, polyLinePaths, nearestPlace, gps, zoom, isGeolocated, basicPlaceInfos, noNearestPlaceInfos} = this.state;
    let view; 
    if (lat && lng) {
      view = 
      <div>
        {/* {
          nearestPlace && !noNearestPlaceInfos 
          ? 
          <div>
            <p>Avoir plus d'informations sur {nearestPlace.name} ?</p>
            <button onClick={event => this.disableNearestPlace(event)}>Non</button>
            <Link
              to={{
                pathname: "/infobulle",
                state: { nearestPlace }
              }}
            >Oui</Link>
          </div>
          :
          <p>No place found, please go on statue</p>
        } */}
        <form>
          <input type='text' placeholder="Rechercher..."></input>
        </form>
        <div className="mapContainer">
          <Map
            google={this.props.google}
            zoom={zoom}
            className={'map'}
            styles={styleMap}
            style={mapStyles}
            fullscreenControl={false}
            panControl={false}
            rotateControl={false}
            streetViewControl={false}
            scaleControl={false}
            initialCenter={{lat,lng}}
          >
            <Polygon
              paths={polyLinePaths}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={1}
            />
            {
              isGeolocated &&
              <Marker
                title={'The marker`s title will appear as a tooltip.'}
                name={`You`}
                icon={"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
                position={{lat, lng}} 
              />
            }
            {
              places.map( (place,index) => 
                <Marker
                  name={place.name}
                  position={place.position}
                  key={`marker-${place.name}`}
                  onClick={() => {
                    this.getBasicPlaceInfos({ 
                      name: place.name, 
                      addresse: place.addresse, 
                      img: place.pictures.current.small
                    })}
                  }
                />
            )}
            {
              gps && 
              <Polyline   
                geodesic={true}
                options={{
                  path: gps.path,
                  strokeColor: '#34495e',
                  strokeOpacity: 1,
                  strokeWeight: 4,
                  icons: [{
                    offset: '0',
                    repeat: '010px'
                  }],
                }}
              />
            }
          </Map>
          {
            basicPlaceInfos &&
            <div className={'basicPlaceInfos'}>
                <img src={basicPlaceInfos.img} alt={``} />
                <div>
                  <h2>{basicPlaceInfos.name}</h2>
                  <p>{basicPlaceInfos.addresse}</p>
                </div>
            </div>
          }
          
        </div>
        <div id="GPS">

        </div>
      </div>
    }

    return (
      <div>
        {view}
      </div>
    );
  }


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.intervalId);
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAop-zibd_mZlm2-z2Vu0N9qZXMYZqP17c'
})(GPS);