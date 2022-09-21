import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AxiosResponse } from "axios";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import FooterNavigation from "../../common/components/FooterNavigation";
import RecordHeader from "../../common/components/RecordHeader";
import "./MapPage.scss";
import park from "./park.jpg";
import { dummyData } from "./dummypin";
import { dummyMungple } from "./dummymungple";
import { getMapData } from "../../common/api/record";
import { Mungple, Cert } from "./MapType";
import { markerRender } from "./MarkerRender";

function MapPage() {
  const mapElement = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mungple, setMungple] = useState('ON');
  const [isLoading, setIsLoading] = useState(true);
  const [globarMap, setGlobarMap] = useState<naver.maps.Map>();
  const [certNormalList, setCertNormalList] = useState<Cert[]>([]);
  const [certMungpleList, setCertMungpleList] = useState<Cert[]>([]);
  const [mungpleList, setMungpleList] = useState<Mungple[]>([]);
  const [currentZoom, setCurrentZoom] = useState({ zoom: 2, size: 70 });
  const [test, setTest] = useState({ value: 1 });
  const [currentLocation, setCurrentLocation] = useState({ lat: dummyData[0].lat, lng: dummyData[0].lng, zoom: 17, option: { zoom: 2, size: 70 } });

  const pinButtonHandler = () => {
    console.log(1);
  };

  let map: naver.maps.Map;

  const getMapPageData = async () => {
    await getMapData(0, (response: AxiosResponse) => {
      const { code, data } = response.data;
      setCertMungpleList(data.certMungpleList);
      setCertNormalList(data.certNormalList);
      setMungpleList(data.mungpleList);
      console.log(response.data);
    }, dispatch);
  };

  useEffect(() => {
    getMapPageData();
  }, []);


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

    if (mungple === "OFF") {
    certNormalList.forEach((data) => {
      const markerOptions = {
        // position: new window.naver.maps.LatLng(parseFloat(data.longitude), parseFloat(data.latitude)),
        position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
        map,
        icon: {
          content: [
            `<div class="pin${currentLocation.option.zoom}" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.certificationId}`) });
    })

    certMungpleList.forEach((data) => {
      const markerOptions = {
        // position: new window.naver.maps.LatLng(parseFloat(data.longitude), parseFloat(data.latitude)),
        position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
        map,
        icon: {
          content: [
            `<div class="pin${currentLocation.option.zoom} mungplepin" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.certificationId}`) });
    })
    }
    else if (mungple === 'ON') {
      mungpleList.forEach((data) => {
        const markerOptions = {
          position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
          map,
          icon: {
            content: [
              `<div class="mungple" style="z-index:${data.mungpleId}"/>`,
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
    naver.maps.Event.addListener(map, 'zoom_changed', () => {
      setTimeout(() => {
        const location = map.getCenter();
        const zoom = map.getZoom();
        let option: { size: number, zoom: number } = { zoom: 2, size: 70 };
        if (zoom > 20) option = { zoom: 3, size: 100 };
        else if (zoom > 10) option = { zoom: 2, size: 70 };
        else option = { zoom: 1, size: 50 };
        setCurrentLocation({ lat: location.y, lng: location.x, zoom, option });
      }, 200)
    })
  }, [mungple, mungpleList, certMungpleList, certNormalList, currentLocation]);

  const mapStyle = {
    width: '100vw',
    height: '80vh',
  }

  // console.log(globarMap?.getCenter(), globarMap?.getZoom());

  const mungpleButtonHandler = () => {
    const location = globarMap?.getCenter();
    const zoom = globarMap!.getZoom();
    setCurrentLocation((prev) => {
      return { ...prev, lat: location!.y, lng: location!.x, zoom };
    })
    if (mungple === 'ON')
      setMungple('OFF');
    else {
      setMungple('ON');
    }
  };

  return <div>
    <RecordHeader />
    <div ref={mapElement} style={mapStyle} >
      {!isLoading &&
        <div aria-hidden="true"
          onClick={mungpleButtonHandler}
          className={classNames("mungplace-toggle", { mungpleOff: mungple !== 'ON' })} >
          {`멍플 ${mungple}`}
        </div>
      }
    </div>
    <FooterNavigation />
  </div>
}

export default MapPage;