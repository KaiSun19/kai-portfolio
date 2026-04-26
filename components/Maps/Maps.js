"use client";

import React, { useEffect, useRef } from "react";
import {
  Section,
  SectionDivider,
  SectionTitle,
} from "../../styles/GlobalComponents";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapContainer, MapText } from "./MapsStyles";

const map_api_key = process.env.NEXT_PUBLIC_MAPBOX_API_KEY;

const Maps = () => {
  const mapsRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          document.querySelector(".map-div").classList.add("fadeInUpClass");
        }
      });
    });
    if (mapsRef.current) {
      observer.observe(mapsRef.current);
    }
  }, [mapsRef]);

  return (
    <Section id="tech">
      <SectionDivider divider />
      <SectionTitle ref={mapsRef}>Find me here</SectionTitle>
      <div className="map-div">
        <MapContainer>
          <Map
            initialViewState={{
              longitude: -0.11637,
              latitude: 51.502651,
              zoom: 14,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={map_api_key}
            className="map-container"
          >
            <Marker longitude={-0.11637} latitude={51.502651} color="red" />
          </Map>
        </MapContainer>
        <MapText className="mapTextContainer">
          <ul>
            <li>
              <strong className="map-text-headers">Address</strong> : 10 York
              Rd, London SE1 7ND
            </li>
            <li>
              <strong className="map-text-headers">Location</strong> : We Work
            </li>
            <li>
              <strong className="map-text-headers">Activity</strong> : Changing
              the world one flexbox at a time
            </li>
          </ul>
        </MapText>
      </div>
    </Section>
  );
};

export default Maps;
