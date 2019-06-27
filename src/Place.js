
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
    const { nearestPlace } = this.state;
    return (
      <div>
        {
          nearestPlace 
            ?
            <div className={'placeInfos'}>
              <h1>{nearestPlace.name}</h1>
              <Tabs>
                <TabList>
                  <Tab>Avant / Après</Tab>
                  <Tab>Infos</Tab>
                  <Tab>Fun facts</Tab>
                </TabList>

                <TabPanel>
                  <div className={'placeInfos__beforeAfterSlider'}>
                    <BeforeAfterSlider
                      before={nearestPlace.pictures.current.big}
                      beforeClassName={"placeOldPicture"}
                      after={nearestPlace.pictures.old}
                      afterClassName={"placeNextPicture"}
                      width={window.innerWidth}
                      height={window.innerHeight - 200}
                    />
                  </div>
                </TabPanel>
                <TabPanel>
                  <ul className={'placeInfos__infos'}>
                    <li>
                      <img src={nearestPlace.pictures.current.big} alt={`${nearestPlace.name}`} />
                    </li>
                    <li className={'placeInfos__infos__colored'}>
                      <h2>En bref</h2>
                      <p>{nearestPlace.content.introduction}</p>
                    </li>
                    <li className={'placeInfos__infos__history'}>
                      <h2>Un peu d'histoire</h2>
                      <p>{nearestPlace.content.histoire}</p>
                    </li>
                  </ul>
                </TabPanel>
                <TabPanel>
                  <h2>Fun facts</h2>
                </TabPanel>              
              </Tabs>
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
        <Nav />
      </div>
    );
      
  }
}

export default Place;
