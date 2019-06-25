import React from 'react';
import axios from "axios";
import Clarifai from "clarifai";
import Camera, { FACING_MODES, IMAGE_TYPES }  from 'react-html5-camera-photo';
import { Link } from "react-router-dom";

import 'react-html5-camera-photo/build/css/index.css';

const appClarifai = new Clarifai.App({
  apiKey: "a151eabbd43f493783fd82f203ee48e8"
})

export class CameraPhoto extends React.Component {
  state = {
    pic: null
  }

  onTakePhoto (dataUri) {
    this.setState({
      pic: dataUri
    })

    axios.post('/api/image', {
      picture: dataUri
    })
    .then(response => {
      appClarifai.models.initModel({id: 'patrimoine', version: "421a18466de4434b99fe78704f644e7c"}).then(customModel => {
        return customModel.predict("https://cdp2021.herokuapp.com/out.jpg");
      })
      .then(response => {
        this.setState({
          photoTaken: true
        })

        var concepts = response['outputs'][0]['data']['concepts']
        console.log("TRAIN IA", concepts);
      
        if (concepts[0].value >= 0.6) {
          this.setState({
            place: concepts[0]
          })
        } else {
          this.setState({
            noPlace: true
          })
        }
      })
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
 
  render() {
    // const { nearestPlace } = this.state.place;
    return (
      <div className="App">
        {
          !this.state.photoTaken ?
            <div>
              <Camera
                onTakePhoto={dataUri => {this.onTakePhoto(dataUri)}}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                idealResolution={{width: 640, height: 480}}
                imageType={IMAGE_TYPES.JPG}
                imageCompression={0.97}
                isMaxResolution={false}
                isImageMirror={false}
                isSilentMode={true}
                isDisplayStartCameraError={false}
                isFullscreen={false}
                sizeFactor={1}
                onCameraError={error => {this.onCameraError(error)}}
              />
            </div>
            : 
            <div>
              {
                this.state.place &&
                <div>
                  <h2>Il semblerait que tu sois à {this.state.name}</h2>
                  <p>Souhaites-tu avoir plus d'informations sur ce lieu ?</p>
                  <div>
                    <button onClick={event => this.disableNearestPlace(event)}>Non</button>
                    <Link
                      to={{
                        pathname: "/infobulle",
                        state: this.state.place
                      }}
                    >Oui</Link>
                  </div>
                </div>
              }
              {
                this.state.noPlace &&
                <div>
                  <p>Oups, nous ne parvenons pas à trouver la place sur laquelle tu te trouves <span role="img" aria-label="emoji sad">😔</span></p>
                  <button onClick={this.renewPic}>Nouvelle photo</button>
                </div>
              }
            </div>
        }

      </div>
    );
  }
}

export default CameraPhoto;
