import React from 'react';
import Routeur from './Routeur';
import './styles/index.scss';

export class App extends React.Component {
  componentWillMount() {
    if (process.env.NODE_ENV === "production" && window.location.protocol === "http:") {
      window.location.replace('https://cdp2021.herokuapp.com/#');
    }
  }
  render() {
    return (
      <Routeur />
    );
  }
}  




export default App;
