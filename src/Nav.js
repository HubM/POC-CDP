import React from 'react';
import {NavLink} from "react-router-dom";
import {ReactComponent as LogoMap} from './styles/assets/map.svg'
import {ReactComponent as LogoScan} from './styles/assets/scan.svg'
import {ReactComponent as LogoDiscover} from './styles/assets/discover.svg'

export class Nav extends React.Component {
  state = {}
  
  render() {
    return (
      <footer className="mainNav">
        <nav className="navigator">
          <ul>
            <li>
              <NavLink exact activeClassName="activeLink" to="/"><div><LogoMap /></div></NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/camera"><LogoScan /></NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink" to="/place"><LogoDiscover /></NavLink>
            </li>
          </ul>
        </nav>
      </footer>
    );
  }
}

export default Nav;
