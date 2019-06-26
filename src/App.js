import React from 'react';
import { HashRouter as Router, Route, NavLink} from "react-router-dom";

import Nav from "./Nav";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";
import Infobulle from "./Infobulle";
import Routeur from './Routeur';

import { isMobileOrTablet } from "./utils";

import {ReactComponent as LogoMap} from './styles/assets/map.svg'
import {ReactComponent as LogoScan} from './styles/assets/scan.svg'
import {ReactComponent as LogoDiscover} from './styles/assets/discover.svg'

import './styles/index.scss';

export class App extends React.Component {
  render() {
    
    return (
        <Routeur />
    );
  }
}  




export default App;
