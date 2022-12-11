import React, { useEffect, useRef } from 'react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapText } from './MapsStyles';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from '../Technologies/TechnologiesStyles';

const map_api_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;


const Maps = () => {

    const mapsRef = useRef();

    useEffect(()=>{
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if(entry.isIntersecting){
              document.querySelector('.map-div').classList.add('fadeInUpClass');
            }
          })
        });
        if(mapsRef.current){
          observer.observe(mapsRef.current);
        }
      },[mapsRef]
      )

    return(

        <Section id="tech">
        <SectionDivider divider />
        <SectionTitle ref = {mapsRef}>Find me here</SectionTitle>
        <div className='map-div'>
            <MapContainer>
                <Map
                    initialViewState={{
                        longitude: -0.1322312269547322,
                        latitude: 51.52488928401956,
                        zoom: 14
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={map_api_key}
                    className = 'map-container'
                    >

                    <Marker longitude={-0.1322312269547322} latitude={51.52488928401956} color="red" />

                </Map>
            </MapContainer>
            <MapText className='mapTextContainer'>
                <ul>
                    <li>
                        <strong className='map-text-headers'>Address</strong> : 27-28, Student Centre, Gordon Square, London WC1H 0AH
                    </li>
                    <li>
                        <strong className='map-text-headers'>Location</strong> : Student Centre
                    </li>
                    <li>
                        <strong className='map-text-headers'>Activity</strong> : Coding, Drinking Coffee
                    </li>
                </ul>


            </MapText> 
        </div>

    </Section>

    )
};

export default Maps;