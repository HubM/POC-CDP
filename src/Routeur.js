import React from 'react';
import { HashRouter as Router, Route, NavLink} from "react-router-dom";

import Nav from "./Nav";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Infobulle from "./Infobulle";

import { isMobileOrTablet } from "./utils";

import './styles/index.scss';

export class Routeur extends React.Component {
  render() {
    let initialView;
    let nav;
    // if (isMobileOrTablet()) {
      initialView = 
        <Router>
          <Nav />
          <Route exact path='/' component={GMap} />
          <Route path="/camera" component={CameraPhoto} />
          <Route path="/infobulle" component={Infobulle} />
        </Router>
    // } else {
    //   initialView = 
    //     <div>
    //     <h1>you should use this website on your mobile</h1>
    //     </div>
    // }
    nav = <Nav />
    return (
      <section>
        {initialView}
      </section>
    );
  }
}  




export default Routeur;
