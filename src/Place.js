
import React from 'react';
import {Link} from "react-router-dom";
import BeforeAfterSlider from 'react-before-after-slider';
import {ReactComponent as PlaceNotFound} from './styles/assets/placeNotFound.svg';


export class Place extends React.Component {
  state = {}
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
              <div style={{textAlign: "center"}}>
                <p className={'placeNotFound__message'}>Vous n'êtes pas à proximité <br/> d'un totem bleu.</p>
                <PlaceNotFound />
                <p className={'placeNotFound__help'}>Situez-les sur la carte pour vous y rendre, et en apprendre plus sur les monuments</p>
                <Link
                  to={{
                    pathname: "/",
                  }}
                >Voir la carte</Link>
              </div>

            </div>
            
        }
      </div>
    );
      
  }
}

export default Place;
