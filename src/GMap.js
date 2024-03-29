import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Polygon, Marker, Polyline }  from 'google-maps-react';
import { Link } from "react-router-dom";

import {ReactComponent as LogoMap} from './styles/assets/map.svg';
import {ReactComponent as LogoScan} from './styles/assets/scan.svg';
import {ReactComponent as LogoPlace} from './styles/assets/place.svg';
import {ReactComponent as ScanOrange} from './styles/assets/orange_scan.svg';

import places from "./data/places";

import {ReactComponent as SearchIcon} from './styles/assets/searchIcon.svg'
import {ReactComponent as CDPIcon} from './styles/assets/logoCDP.svg';
import {ReactComponent as LoaderMap} from './styles/assets/loadingLogo.svg';

const styleMap = require('./styleMap.json')

const mapStyles = {
  width: '100%',
  height: '100%',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
}

const noGeolocPosition = {
  zoom: 14,
  lat: 44.85,
  lng: -0.560049
}

export class GPS extends Component {
  state = {
    lng: null,
    lat: null,
    nearestPlace: null,
    basicPlaceInfos: null,
    isGeolocated: false,
    noNearestPlaceInfos: false,
    polyLinePaths: [],
    isCIAPActive: false
  }

  componentDidMount() {
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
      new google.maps.LatLng(position.coords.latitude - 0.001, position.coords.longitude - 0.001),
      new google.maps.LatLng(position.coords.latitude - 0.001, position.coords.longitude + 0.001),
      new google.maps.LatLng(position.coords.latitude + 0.001, position.coords.longitude + 0.001),
      new google.maps.LatLng(position.coords.latitude + 0.001, position.coords.longitude - 0.001),
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
          {lat: position.coords.latitude - 0.001, lng: position.coords.longitude - 0.001},
          {lat: position.coords.latitude - 0.001, lng: position.coords.longitude + 0.001},
          {lat: position.coords.latitude + 0.001, lng: position.coords.longitude + 0.001},
          {lat: position.coords.latitude + 0.001, lng: position.coords.longitude - 0.001}
        ]
      })
    }, 300)
  }

  errorGeoloc = error => {
    switch (error.code) {
      case 0:
        this.setState({
          positionUnavailable: true
        })
        break;
      case 1:
        this.setState(noGeolocPosition);
        break;
      case 2:
          this.setState({
            positionUnavailable: true
          })
        break;
      case 3: 
        this.setState({
          positionUnavailable: true
        })
        break;
      default:
        break;
    }
  }

  getBasicPlaceInfos = (place) => {
    this.setState({
      basicPlaceInfos: place,
      isCIAPActive: false
    })
  }

  disableNearestPlace(event) {
    event.preventDefault();
    this.setState({ 
      nearestPlace: "",
      noNearestPlaceInfos: true 
    }) 
  } 

  closeBasicPlaceInfos = () => {
    this.setState({
      basicPlaceInfos: null
    })
  }

  render() {
    const { lat, lng, polyLinePaths, nearestPlace, gps, zoom, isGeolocated, basicPlaceInfos, noNearestPlaceInfos, isCIAPActive, positionUnavailable } = this.state;
    let MapView; 

    if (isCIAPActive) {
      MapView =
        <div className={"notification basicBotNotif CIAP"}>
          <h1 className={'pageTitle'}>CIAP</h1>
          <div className={'CIAP__horaires'}>
            <h2>Horaires</h2>
            <p className={'blueText'}>Du lundi au samedi :</p>
            <p>9h - 13h / 14h-18h30</p>
            <p className={'blueText'}>Dimanche et jours fériés :</p>
            <p style={{marginBottom: 15}}>9h - 13h / 14h-17h</p>
            <p>Fermé le 25 décembre et le 1er janvier.</p>
            <p>Accessible en français, anglais, espagnol.</p>
          </div>
          <div className={'CIAP__addresse'}>
            <h2>Adresse</h2>
            <p className={'blueText'}>Centre d'interprétation Bordeaux Patrimoine Mondial - CIAP</p>
            <p>4 place de la Bourse <br /> 33000 Bordeaux
            </p>
          </div>
          <div className={'CIAP__Téléphone'}>
            <h2>Téléphone</h2>
            <a href="tel:+33556480424">+33 5 56 48 04 24</a>
          </div>
          <div className={'CIAP__tarifs'}>
            <h2>Tarifs</h2>
            <p><span className={'blueText'}>Entrée libre</span> et <span className={'blueText'}>gratuite</span> dans l'exposition</p>
          </div>
          <div className={"notification__btns"}>
            <button onClick={() => this.setState({isCIAPActive: false})}>Fermer</button>
          </div>
        </div>
    } else if (lat && lng) {
      MapView = 
        <div className={'mapsView'}>
          {
            nearestPlace && !noNearestPlaceInfos 
            &&
            <Link
            to={{ 
              pathname: "/place",
              state: nearestPlace
            }}
            className={`notifNextoPlace`}
            >
              <div className={"notifNextoPlace__container"}>
                <CDPIcon />
                <p>Vous êtes à proximité d'un totem bleu ! <br />Découvrez en plus sur le monument.</p>
              </div>
            </Link>
          }
           <form className={'searchPlace'} autoComplete={'off'}>
            <label htmlFor="searchInput">Rechercher</label>
            <div className={'searchPlace__input'}>
              <input type='text' placeholder="Exemple: Grand théâtre" name="searchInput" />
              <SearchIcon />
            </div>
          </form>
          <div className="mapContainer">
            <Map
              google={this.props.google}
              zoom={zoom}
              zoomControl={false}
              mapTypeControl={false}
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
                strokeOpacity={0.0}
                strokeWeight={0}
                fillOpacity={0.0}
              />
              {
                isGeolocated &&
                <Marker
                  title={'Your position.'}
                  name={`You`}
                  icon={"http://www.m2groupe4.ecvdigitalbdx.fr/assets/img/your_position.svg"}
                  position={{lat, lng}} 
                />
              }
              {
                places.map( (place,index) => 
                  <Marker
                    name={place.name}
                    icon={place.marker}
                    position={place.position}
                    key={`marker-${place.name}`}
                    onClick={
                      event => {
                        if (event.name !== "CIAP Bordeaux Patrimoine") {
                          this.getBasicPlaceInfos({ 
                            name: place.name, 
                            addresse: place.addresse, 
                            img: place.pictures.current.small,
                          })
                        } else {
                          this.setState({
                            isCIAPActive: true
                          })
                        }
                      }
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
              <div className={"notification basicBotNotif"}>
                <div className={"notification__content"}>
                  <div className={"notification__picture"}>
                    <img src={basicPlaceInfos.img} alt={``} />
                  </div>
                  <div>
                    <h2>{basicPlaceInfos.name}</h2>
                    <p>{basicPlaceInfos.addresse}</p>
                  </div>
                </div>
                <div className={"notification__btns"}>
                  <button onClick={this.closeBasicPlaceInfos}>Fermer</button>
                </div>
              </div>
            }
            {
              positionUnavailable &&
              <div className={"notification scanNotif basicTopNotif"}>
                <div className={"notification__picture"}>
                  <div className={"notification__content"}>
                    <ScanOrange />
                    <p>La géolocalisation de votre appareil ne peut pas être détecté... Merci de vider le cache de votre navigateur pour recommencer.</p>
                  </div>
                </div>
                <div className={"notification__btns"}>
                  <button onClick={() => this.setState({ 
                    positionUnavailable: null, 
                    ...noGeolocPosition 
                    })}>Fermer</button>
                </div>
              </div>
            }
          </div>
          <footer className="mainNav">
          <nav className="navigator">
            <ul>
              <li>
                <Link className="activeLink" to="/"><div><LogoMap /></div></Link>
              </li>
              <li>
                <Link to="/camera"><LogoScan /></Link>
              </li>
              <li>
                <Link to={{
                  pathname: "/place",
                  state: nearestPlace
                }}><LogoPlace /></Link>
              </li>
            </ul>
          </nav>
        </footer>
        </div>
    } else {
      MapView = 
      <div className={'loadingMap'}>
        <LoaderMap />
      </div>
    }

    return (
      <div>
        {MapView}
      </div>
    );
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname !== "/") {
      navigator.geolocation.clearWatch(this.state.intervalId);
    }
  }
}

  export default GoogleApiWrapper({
  apiKey: 'AIzaSyAop-zibd_mZlm2-z2Vu0N9qZXMYZqP17c'
})(GPS);