import React from 'react';
import { HashRouter as Router, Route, NavLink} from "react-router-dom";

import Home from "./Home";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Infobulle from "./Infobulle";

import { isMobileOrTablet } from "./utils";

import {ReactComponent as LogoMap} from './styles/assets/map.svg'
import {ReactComponent as LogoScan} from './styles/assets/scan.svg'
import {ReactComponent as LogoDiscover} from './styles/assets/discover.svg'

import './styles/index.scss';

export class App extends React.Component {
  render() {
    let initialView;
    // if (isMobileOrTablet()) {
      initialView = 
        <Router>
          <header className="mainNav">
            <nav className="navigator">
              <ul>
                <li>
                  <NavLink activeClassName="activeLink" to="/"><div><LogoMap /></div></NavLink>
                </li>
                <li>
                  <NavLink activeClassName="activeLink" to="/camera"><LogoScan /></NavLink>
                </li>
                <li>
                  <NavLink activeClassName="activeLink" to="/infobulle"><LogoDiscover /></NavLink>
                </li>
              </ul>
            </nav>
        </header>

          <Route path='/' component={GMap} />
          {/* <Route path="/map" component={GMap}/> */}
          <Route path="/camera" component={CameraPhoto} />
          <Route path="/infobulle" component={Infobulle} />


          {/* <Route path='/menu' exact component={Home} /> */}
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
