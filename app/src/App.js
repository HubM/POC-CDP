import React from 'react';
import axios from "axios";

export class App extends React.Component {

  componentWillMount() {
    axios.post('http://localhost:4000/image', {
      firstName: 'Hub',
      lastName: 'Mncs'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return (
      <div className="App">
       Hello
      </div>
    );
  }
}

export default App;
