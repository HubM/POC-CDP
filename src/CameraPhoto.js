import React from 'react';
import axios from "axios";
import Clarifai from "clarifai";
import Camera, { FACING_MODES, IMAGE_TYPES }  from 'react-html5-camera-photo';
import { Link } from "react-router-dom";

import {ReactComponent as ScanOrange} from './styles/assets/orange_scan.svg';
import {ReactComponent as BlueScan} from './styles/assets/blue_scan.svg';

import places from "./data/places";

import Nav from "./Nav";

import 'react-html5-camera-photo/build/css/index.css';

const appClarifai = new Clarifai.App({
  apiKey: "a151eabbd43f493783fd82f203ee48e8"
})

export class CameraPhoto extends React.Component {
  state = {
    pic: null,
    basicPlaceInfos: true,
  }

  onTakePhoto (dataUri) {
    this.setState({
      pic: dataUri
    })

    axios.post('/api/image', {
      picture: dataUri
    })
    .then(response => {
      if (response.data.message) {
        alert('Merci de tester cette fonctionnalité en production ! 😀')
      } else {
        appClarifai.models.initModel({id: 'patrimoine', version: "c26939103823474eb04d28bde0cd5b9e"}).then(customModel => {
          return customModel.predict("https://cdp2021.herokuapp.com/out.jpg");
        })
        .then(response => {
          var concepts = response['outputs'][0]['data']['concepts'];
          console.log(concepts);

          if (concepts.length > 0) {
            if (concepts[0].value >= 0.6) {
              const place = places.filter(placeItem => placeItem.name === concepts[0].name).flat();
              this.setState({
                place: place[0]
              })
            } else {
              this.setState({
                noPlace: true
              })
            }
          } else  {
            this.setState({
              noResults: true
            })
          }
        })
      }
    })
    .catch(error => {
      console.error(error);
    })
  }

  onCameraError = error => {
    console.log(error);
  }

  renewPic = () => {
    this.setState({
      photoTaken: false, 
      noPlace: false
    })
  }

  closeBasicPlaceInfos = () => {
    this.setState({
      basicPlaceInfos: null
    })
  }
 
  render() {
    const { place, noPlace, basicPlaceInfos, noResults } = this.state;
    return (
      <div className="App">
        <div className="pageTitle">Scannez</div>
        {
          basicPlaceInfos ?
            <div className={"notification scanNotif basicTopNotif"}>
              <div className={"notification__picture"}>
                <div className={"notification__content"}>
                  <BlueScan />
                  <div>
                    <p>Scannez les monuments situés à proximité de nos totems bleus, pour en apprendre plus sur eux !</p>
                    <p>Utilisez la carte pour situer les totems bleus.</p>
                  </div>
                </div>
                <div className={"notification__btns multiple"}>
                  <button onClick={this.closeBasicPlaceInfos}>Fermer</button>
                  <Link to={'/'}>Voir la carte</Link>
                </div>
              </div>
            </div>
          : null
        }
        {
          basicPlaceInfos ?
            <div className={"backgroundBlackCamera"}></div>
            : <div>
                <Camera
                  onTakePhoto={dataUri => {this.onTakePhoto(dataUri)}}
                  idealFacingMode={FACING_MODES.ENVIRONMENT}
                  idealResolution={{width: 640, height: 600}}
                  // isFullscreen={true}
                  imageType={IMAGE_TYPES.JPG}
                  imageCompression={0.97}
                  isMaxResolution={false}
                  isImageMirror={false}
                  isSilentMode={true}
                  isDisplayStartCameraError={false}
                  // sizeFactor={0.25}
                  onCameraError={error => {this.onCameraError(error)}}
                />
              </div>
        }
          <div>
            {
              place &&
              <div className={"notification scanNotif placeDiscovered basicTopNotif"}>
                <div className={"notification__picture"}>
                  <div className={"notification__content"}>
                    <img src={place.pictures.current.small} alt={`${place.name}`} />
                  </div>
                  <div>
                    <h2>{place.name}</h2>
                    <p>Le monument a été détecté !</p>
                    <p>Vous pouvez maintenant en découvrir plus à son sujet.</p>
                  </div>
                </div>
                <div className={"notification__btns multiple"}>
                  <button onClick={() => this.setState({ place: null })}>Réessayer</button>
                  <Link
                    to={{
                      pathname: '/place',
                      state: this.state.place
                    }}
                  >Découvrir</Link>
                </div>
              </div>
            }
            {
              noPlace &&
               <div className={"notification scanNotif basicTopNotif"}>
                <div className={"notification__picture"}>
                  <div className={"notification__content"}>
                    <ScanOrange />
                    <p>Nous ne reconnaissons pas le monument... <br /> Êtes-vous bien à côté d'un totem bleu ? Réessayez ou regarder la carte pour voir où ils se trouvent.</p>
                  </div>
                </div>
                <div className={"notification__btns multiple"}>
                  <button onClick={() => this.setState({ noPlace: null })}>Réessayer</button>
                  <Link to={'/'}>Voir la carte</Link>
                </div>
              </div>
            }
            {
              noResults &&
              <div className={"notification scanNotif placeDiscovered basicTopNotif"}>
                <div className={"notification__picture"}>
                  <div className={"notification__content"}>
                    <ScanOrange />
                  </div>
                  <div>
                    <h2>Oups !</h2>
                    <p>Il semblerait qu'il y ait des problèmes avec notre service <span role="img" aria-label="emoji confuse">😕</span></p>
                    <p>Merci de réessayer ultérieurement</p>
                  </div>
                </div>
                <div className={"notification__btns multiple"}>
                  <button onClick={() => this.setState({ noResults: null })}>Réessayer</button>
                  <Link
                    to={{
                      pathname: '/'
                    }}
                  >Voir la carte</Link>
                </div>
              </div> 
            }
          </div>
        <Nav />
      </div>
    );
  }
}

export default CameraPhoto;
