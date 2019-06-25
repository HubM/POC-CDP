import React from 'react';
import { HashRouter as Router, Route} from "react-router-dom";

import Home from "./Home";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Infobulle from "./Infobulle";

import { isMobileOrTablet } from "./utils";

export class App extends React.Component {
  render() {
    let initialView;
    // if (isMobileOrTablet()) {
      initialView = 
        <Router>
          <Route path='/' component={Home} />
          <Route path="/map" component={GMap}/>
          <Route path="/camera" component={CameraPhoto} />
          <Route path="/infobulle" component={Infobulle} />
        </Router>
    // } else {
      // initialView = 
        // <div>
          {/* <h1>you should use this website on your mobile</h1> */}
        {/* </div> */}
    // }
    return (
      <section>
        {initialView}
      </section>
    );
  }
}  
export default App;
