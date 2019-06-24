import React from 'react';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export class Home extends React.Component {
    state = {
    }
    render() {
        return (
        <div className="Home">
            <p>Hello Home</p>
            <Link to="/gps/">GPS</Link>
            <Link to="/camera/">CameraPhoto</Link>
        </div>
        );
        
    }
}

export default Home;
