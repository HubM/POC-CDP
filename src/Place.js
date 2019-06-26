
import React from 'react';
import {Link} from "react-router-dom";
import BeforeAfterSlider from 'react-before-after-slider';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import {ReactComponent as PlaceNotFound} from './styles/assets/placeNotFound.svg';

import Nav from "./Nav";


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
            <Tabs>
              <TabList>
                <Tab>Avant / Après</Tab>
                <Tab>Infos</Tab>
                <Tab>Fun facts</Tab>
              </TabList>

              <TabPanel>
                <div className={'beforeAfterSlider'}>
                  <BeforeAfterSlider
                    before={this.state.nearestPlace.pictures.current.big}
                    beforeClassName={"placeOldPicture"}
                    after={this.state.nearestPlace.pictures.old}
                    afterClassName={"placeNextPicture"}
                    width={window.innerWidth}
                    height={window.innerHeight - 200}
                  />
                </div>
              </TabPanel>
              <TabPanel>
                <h2>Infos pannel</h2>
              </TabPanel>
              <TabPanel>
                <h2>Fun facts</h2>
              </TabPanel>              
            </Tabs>
    
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
        <Nav />
      </div>
    );
      
  }
}

export default Place;
