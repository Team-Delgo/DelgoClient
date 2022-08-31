import React, { useEffect, useRef } from "react";
import RecordHeader from "../common/components/RecordHeader";
import "./MapPage.scss";
import park from "./park.jpg";
import Pin from "./Pin";

function MapPage() {
  const mapElement = useRef(null);


  useEffect(() => {
    if(!mapElement.current || !naver) return;
    const location = new window.naver.maps.LatLng(37.5656, 126.9769);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      // zoomControlOptions: {
      //   position: window.naver.maps.Position.TOP_RIGHT,
      // },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);
    const markerOptions = {
      position: location,
      map,
      icon: {
          // content: `<img src=${park} alt=${1} style="width: 40px; height:40px; border-radius:100%">`,
          content: [
            `<div class="pin">`,
              `<img src=${park} alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(100, 100),
          origin: new naver.maps.Point(0, 0),
          // anchor: new naver.maps.Point(50, 10)
      }
  };
  
    
    const marker = new naver.maps.Marker(markerOptions);
  }, []);

  const mapStyle = {
    width: '100vw',
    height: '85vh',
    overFlow: 'hidden'
  }

  return <div>
    <RecordHeader/>
    <div ref={mapElement} style={mapStyle} />
  </div>
}

export default MapPage;