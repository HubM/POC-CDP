import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./Home";
import GMap from "./GMap";
import CameraPhoto from "./CameraPhoto";

export class App extends React.Component {
    render() {
        return (
          <Router>
            <Route path='/' component={Home} />
            <Route path="/map" component={GMap}/>
            <Route path="/camera" component={CameraPhoto} />
          </Router>
        );
    }
}  
export default App;
