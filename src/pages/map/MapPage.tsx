import React, { useEffect, useRef } from "react";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import "./MapPage.scss";
import park from "./park.jpg";
import { dummyData } from "./dummypin";

function MapPage() {
  const mapElement = useRef(null);


  useEffect(() => {
    if(!mapElement.current || !naver) return;
    const location = new window.naver.maps.LatLng(dummyData[0].lat, dummyData[0].lng);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: 17,
      zoomControl: true,
      // zoomControlOptions: {
      //   position: window.naver.maps.Position.TOP_RIGHT,
      // },
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    dummyData.forEach((data)=>{
      const markerOptions = {
        position: new window.naver.maps.LatLng(data.lat, data.lng),
        map,
        icon: {
            content: [
              `<div class="pin" style="z-index:${data.id}">`,
                `<img src=${data.photo} style="z-index:${data.id+1}" alt="pin"/>`,
              `</div>`
            ].join(''),
            size: new naver.maps.Size(100, 100),
            origin: new naver.maps.Point(0, 0),
        }
    };
    const marker = new naver.maps.Marker(markerOptions);
    })

    
  
    
    
  }, []);

  const mapStyle = {
    width: '100vw',
    height: '80vh',
  }

  return <div>
    <RecordHeader/>
    <div ref={mapElement} style={mapStyle} />
    <FooterNavigation/>
  </div>
}

export default MapPage;