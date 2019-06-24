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
                  <Link to="/gps/">GPS</Link>
                </li>
                <li>
                  <Link to="/camera/">CameraPhoto</Link>
                </li>
              </ul>
            </nav>
        </div>
        );
        
    }
}

export default Home;
