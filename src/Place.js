
import React from 'react';
import BeforeAfterSlider from 'react-before-after-slider';
import {ReactComponent as PlaceNotFound} from './styles/assets/placeNotFound.svg';


export class Place extends React.Component {
  state = {
  }

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        nearestPlace: this.props.location.state
      })
    }
  }
  render() {
    return (
      <div>
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
            <div className={'placeNotFound'}>
              <div>
                <p className={'placeNotFound__message'}>Vous n'êtes pas à proximité <br/> d'un totem bleu.</p>
                <PlaceNotFound />
              </div>

            </div>
            
        }
      </div>
    );
      
  }
}

export default Place;
