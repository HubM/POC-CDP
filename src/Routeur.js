import React from 'react';
import { HashRouter as Router, Route} from "react-router-dom";

import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Place from "./Place";

export class Routeur extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={GMap} />
        <Route path="/camera" component={CameraPhoto} />
        <Route path="/place" component={Place} />
      </Router>
    );
  }
}  

export default Routeur;
