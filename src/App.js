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

  // componentWillMount() {
  //   appClarifai.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
  //     .then(generalModel => {
  //       return generalModel.predict("https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Balaeniceps_rex_qtl1.jpg/290px-Balaeniceps_rex_qtl1.jpg");
  //     })
  //     .then(response => {
  //       var concepts = response['outputs'][0]['data']['concepts']
  //       console.log(concepts);
  //     })
  // }

  onTakePhoto (dataUri) {
    this.setState({
      pic: dataUri
    })

    // console.log(dataUri)

  

    // const block = dataUri.split(';');
    // const contentType = block[0].split(":")[1];
    // const realData = block[1].split(",")[1];

    // const blob = this.b64toBlob(realData, contentType);

    // // fd.append('image_data', dataUri)
    // const formDataToUpload = new FormData();
    // formDataToUpload.append("image", blob);

    // // const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    axios.post('/api/image', {
      picture: dataUri
    })
    .then(function (response) {
      console.log(response);
      const { url } = response.data;
      
      appClarifai.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
        .then(generalModel => {
          return generalModel.predict(url);
        })
        .then(response => {
          var concepts = response['outputs'][0]['data']['concepts'];
          let selectedPredictions = concepts.map(prediction => prediction.value >= 0.95);
          
          this.setState({
            selectedPredictions
          })
        })
      
    })
    .catch(function (error) {
      console.log(error);
    });


    // console.log('takePhoto', dataUri);
  }

  onCameraError (error) {
    console.error('onCameraError', error);
  }
 
  onCameraStart (stream) {
    console.log('onCameraStart');
  }
 
  onCameraStop () {
    console.log('onCameraStop');
  }


  render() {
    return (
      <div className="App">
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
        <h1>Predictions tests</h1>
        {
          this.state.selectedPredictions.map(predict => 
            <table>
                <thead>
                    <tr>
                        <th colspan="2">Results > 0.95</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{predict.name}</td>
                        <td>{predict.value}</td>
                    </tr>
                </tbody>
            </table>
          )
        }
      </div>
    );
  }
}

export default App;
