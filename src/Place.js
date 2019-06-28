
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
              <h1 className={'pageTitle'}>{nearestPlace.name}</h1>
              <Tabs>
                <TabList>
                  <Tab>Avant / Après</Tab>
                  <Tab>Infos</Tab>
                  <Tab>Fun facts</Tab>
                </TabList>

                <TabPanel>
                  {
                    nearestPlace.pictures.present && 
                    nearestPlace.pictures.old 
                    ?
                    <div className={'placeInfos__beforeAfterSlider'}>
                      <BeforeAfterSlider
                        before={nearestPlace.pictures.present}
                        beforeClassName={"placeOldPicture"}
                        after={nearestPlace.pictures.old}
                        afterClassName={"placeNextPicture"}
                        width={window.innerWidth}
                        height={window.innerHeight - 200}
                      />
                    </div>
                    :
                    <div className={"noFunFacts"}>
                      <p>Pas d'images disponibles pour ce monument <span role="img" aria-label="emoji confuse">😕</span></p>
                    </div>   
                  }
                </TabPanel>
                <TabPanel>
                  {
                    nearestPlace.content 
                      ?
                      <ul className={'placeInfos__infos'}>
                        {
                          nearestPlace.pictures.current.big &&
                          <li className={'placeCard'}>
                            <img src={nearestPlace.pictures.current.big} alt={`${nearestPlace.name}`} />
                          </li>
                        }
                        {
                          nearestPlace.content.introduction &&
                          <li className={'placeCard placeInfos__infos__colored'}>
                            <h2>En bref</h2>
                            <p>{nearestPlace.content.introduction}</p>
                          </li>
                        }
                        {
                          nearestPlace.content.histoire &&
                          <li className={'placeCard placeInfos__infos__history'}>
                            <h2>Un peu d'histoire</h2>
                            <p>{nearestPlace.content.histoire}</p>
                          </li>
                        }
                      </ul>
                      : 
                      <div className={"noFunFacts"}>
                        <p>Pas de contenu disponible pour ce monument <span role="img" aria-label="emoji confuse">😕</span></p>
                      </div>                      
                  }
                 
                </TabPanel>
                <TabPanel>
                  {
                    nearestPlace.content && nearestPlace.content.funfact.length > 0 
                    ? 
                    <ul className={'placeInfos__funFacts'}>
                      {
                        nearestPlace.content.funfact.map((fun, index) => (                          
                          <li className={'placeCard'} key={index}>
                            <h2>{fun.creator_name}, {fun.creator_age} ans</h2>
                            <p>{fun.text}</p>
                          </li>
                        ))
                      }
                   
                    </ul>
                    : 
                    <div className={"noFunFacts"}>
                      <p>Pas de funfacts pour ce monument <span role="img" aria-label="emoji confuse">😕</span></p>
                    </div>
                  }
           
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
