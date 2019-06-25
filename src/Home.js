import React from 'react';
import { NavLink } from "react-router-dom";
import {ReactComponent as LogoMap} from './styles/assets/map.svg'
import {ReactComponent as LogoScan} from './styles/assets/scan.svg'
import {ReactComponent as LogoDiscover} from './styles/assets/discover.svg'

export class Home extends React.Component {
    state = {
    }
    render() {
        return (
        <header className="mainNav">
            <nav className="navigator">
              <ul>
                <li>
                  <NavLink activeClassName="activeLink" to="/map"><div><LogoMap /></div></NavLink>
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
        );
        
    }
}

export default Home;
