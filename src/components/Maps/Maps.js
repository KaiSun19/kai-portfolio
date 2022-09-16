import React from 'react';
import { Section, SectionDivider, SectionText, SectionTitle } from '../../styles/GlobalComponents';
import Map, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapContainer, MapText } from './MapsStyles';
import { List, ListContainer, ListItem, ListParagraph, ListTitle } from '../Technologies/TechnologiesStyles';


const map_api_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;


const Maps = () => (

    <Section id="tech">
        <SectionDivider divider />
        <SectionTitle>Find me here</SectionTitle>
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
            <MapText style = {{marginLeft : 10}}>
                <ul>
                    <li>
                        Address : 27-28, Student Centre, Gordon Square, London WC1H 0AH
                    </li>
                    <li>
                        <strong>Location</strong> : Student Centre
                    </li>
                    <li>
                        <strong>Activity</strong> : Coding, Drinking Coffee
                    </li>
                </ul>


            </MapText> 
        </div>

    </Section>
);

export default Maps;