import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import "./MapPage.scss";
import park from "./park.jpg";
import { dummyData } from "./dummypin";
import { dummyMungple } from "./dummymungple";

function MapPage() {
  const mapElement = useRef(null);
  const navigate = useNavigate();
  const [mungple, setMungple] = useState('ON');
  const [isLoading, setIsLoading] = useState(true);
  const [globarMap, setGlobarMap] = useState<naver.maps.Map>();
  const [currentLocation, setCurrentLocation] = useState({lat:dummyData[0].lat, lng:dummyData[0].lng, zoom:17});

  const pinButtonHandler = () => {
    console.log(1);
  };

  let map: naver.maps.Map;

  useEffect(() => {
    if (!mapElement.current || !naver) return;
    const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: currentLocation.zoom,
      zoomControl: true,
      // zoomControlOptions: {
      //   position: window.naver.maps.Position.TOP_RIGHT,
      // },
    };
    map = new naver.maps.Map(mapElement.current, mapOptions);

    dummyData.forEach((data) => {
      const markerOptions = {
        position: new window.naver.maps.LatLng(data.lat, data.lng),
        map,
        icon: {
          content: [
            `<div class="pin" style="z-index:${data.id}">`,
            `<img src=${data.photo} style="z-index:${data.id + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(100, 100),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.id}`) });
    })
    if(mungple === 'ON'){
    dummyMungple.forEach((data) => {
      const markerOptions = {
        position: new window.naver.maps.LatLng(data.lat, data.lng),
        map,
        icon: {
          content: [
            `<div class="mungple" style="z-index:${data.id}"/>`,
          ].join(''),
          size: new naver.maps.Size(13, 13),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
    })
  }
    setGlobarMap(map);
    setIsLoading(false);
  }, [mungple]);

  const mapStyle = {
    width: '100vw',
    height: '80vh',
  }

  const mungpleButtonHandler = () => {
    const location = globarMap?.getCenter();
    const zoom = globarMap!.getZoom();
    setCurrentLocation({lat:location!.y, lng:location!.x, zoom})
    if (mungple === 'ON')
      setMungple('OFF');
    else {
      setMungple('ON');
    }
  };

  return <div>
    <RecordHeader />
    <div ref={mapElement} style={mapStyle} >
      {!isLoading && <div aria-hidden="true" onClick={mungpleButtonHandler} className="mungplace-toggle" >{`멍플 ${mungple}`}</div>}
    </div>
    <FooterNavigation />
  </div>
}

export default MapPage;