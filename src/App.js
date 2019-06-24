import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";

import Home from "./Home";
import GPS from "./GPS";
import CameraPhoto from "./CameraPhoto";

export class App extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Home} />
                <Route path="/gps/" component={GPS}/>
                <Route path="/camera/" component={CameraPhoto} />
            </Router>
        );
    }
}  
export default App;