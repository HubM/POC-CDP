import React from 'react';
import { HashRouter as Router, Route} from "react-router-dom";

import Home from "./Home";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Infobulle from "./Infobulle";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Route path='/' component={Home} />
        <Route path="/map" component={GMap}/>
        <Route path="/camera" component={CameraPhoto} />
        <Route path="/infobulle" component={Infobulle} />
      </Router>
    );
  }
}  
export default App;
