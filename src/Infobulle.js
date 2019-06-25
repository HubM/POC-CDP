
import React from 'react';
import BeforeAfterSlider from 'react-before-after-slider';
import * as after from './assets/avant.png'
import * as before from './assets/apres.png'

export class Infobulle extends React.Component {
  state = {
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        nearestPlace: this.props.location.state.nearestPlace
      })
    }
  }
  render() {
    return (
      <section>
        {
          this.state.nearestPlace 
            ?
            <div>
              <BeforeAfterSlider
                before={this.state.nearestPlace.pictures.current.big}
                beforeClassName={"placeOldPicture"}
                after={this.state.nearestPlace.pictures.old}
                afterClassName={"placeNextPicture"}
                width={640}
                height={480}
              />
              <h1>{this.state.nearestPlace.name}</h1>
              <p className={"placeAddress"}>{this.state.nearestPlace.addresse}</p>
              
              
            </div>
            : 
            <p>No</p>
        }
      </section>
    );
      
  }
}

export default Infobulle;
