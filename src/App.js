import React from 'react';
import axios from "axios";

import Clarifai from "clarifai";

import Camera, { FACING_MODES, IMAGE_TYPES }  from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const appClarifai = new Clarifai.App({
  apiKey: "a151eabbd43f493783fd82f203ee48e8"
})




export class App extends React.Component {
  state = {
    pic: null
  }

  b64toBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
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

  onCameraError (error) {
    console.error('onCameraError', error);
  }
 
  onCameraStart (stream) {
    console.log('onCameraStart');
  }
 
  onCameraStop () {
    console.log('onCameraStop');
    this.setState({
      photoTaken: true
    })
  }


  render() {
    return (
      <div className="App">
        {
          !this.state.photoTaken ?
            <div>
              <Camera
                onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
                onCameraError = { (error) => { this.onCameraError(error); } }
                idealFacingMode = {FACING_MODES.ENVIRONMENT}
                idealResolution = {{width: 640, height: 480}}
                imageType = {IMAGE_TYPES.JPG}
                imageCompression = {0.97}
                isMaxResolution = {false}
                isImageMirror = {false}
                isSilentMode = {true}
                isDisplayStartCameraError = {true}
                isFullscreen = {false}
                sizeFactor = {1}
                onCameraStart = { (stream) => { this.onCameraStart(stream); } }
                onCameraStop = { () => { this.onCameraStop(); } }
              />
            </div>
            : 
            <div>
              {
                this.state.place &&
                <h2>Il semblerait que tu sois à {this.state.place.name}</h2>
              }
              {
                this.state.noPlace &&
                <div>
                  <p>Oups, nous ne parvenons pas à trouver la place sur laquelle tu te trouves <span role="img" aria-label="emoji sad">😔</span></p>
                  <button onClick={() => this.setState({photoTaken: false, noPlace: false})}>Nouvelle photo</button>
                </div>
              }
            </div>
        }

      </div>
    );
  }
}

export default App;
