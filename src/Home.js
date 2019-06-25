import React from 'react';
import { Link} from "react-router-dom";


export class Home extends React.Component {
    state = {
    }
    render() {
        return (
        <div className="Home">
            <p>Welcome on CIDP app</p>
            <nav>
              <ul>
                <li>
                  <Link to="/map">Voir la carte</Link>
                </li>
                <li>
                  <Link to="/camera">CameraPhoto</Link>
                </li>
                <li>
                  <Link to="/infobulle">Infobulle</Link>
                </li>
              </ul>
            </nav>
        </div>
        );
        
    }
}

export default Home;
