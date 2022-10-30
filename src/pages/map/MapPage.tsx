import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import FooterNavigation from '../../common/components/FooterNavigation';
import RecordHeader from '../../common/components/RecordHeader';
import './MapPage.scss';
import park from './park.jpg';
import { dummyData } from './dummypin';
import { getMapData } from '../../common/api/record';
import { Mungple, Cert } from './MapType';
import { markerRender } from './MarkerRender';
import UserLocation from '../../common/icons/user-location.svg';
import Bath from '../../common/icons/bath-map.svg';
import Cafe from '../../common/icons/cafe-map.svg';
import Beauty from '../../common/icons/beauty-map.svg';
import Walk from '../../common/icons/walk-map.svg';
import Eat from '../../common/icons/eat-map.svg';
import Hospital from '../../common/icons/hospital-map.svg';
import BathSmall from '../../common/icons/bath-map-small.svg';
import CafeSmall from '../../common/icons/cafe-map-small.svg';
import BeautySmall from '../../common/icons/beauty-map-small.svg';
import WalkSmall from '../../common/icons/walk-map-small.svg';
import HospitalSmall from '../../common/icons/hospital-map-small.svg';
import EatSmall from '../../common/icons/eat-map-small.svg';
import PlaceCard from './PlaceCard';

interface MakerItem {
  id: number;
  marker: naver.maps.Marker;
}

function MapPage() {
  const mapElement = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mungple, setMungple] = useState('ON');
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [globarMap, setGlobarMap] = useState<naver.maps.Map>();
  const [certNormalList, setCertNormalList] = useState<Cert[]>([]);
  const [certMungpleList, setCertMungpleList] = useState<Cert[]>([]);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [selectedId, setSelectedId] = useState({
    img: '',
    title: '',
    address: '',
    id: 0,
    prevId: 0,
    lat: 0,
    lng: 0,
    categoryCode: '0',
    prevLat: 0,
    prevLng: 0,
    prevCategoryCode: '0',
  });
  const [mungpleList, setMungpleList] = useState<Mungple[]>([]);
  const [currentZoom, setCurrentZoom] = useState({ zoom: 2, size: 70 });
  const [test, setTest] = useState({ value: 1 });
  const [markerList, setMarkerList] = useState<MakerItem[]>([]);
  const [certMarkerList, setCertMarkerList] = useState<naver.maps.Marker[]>([]);
  const [certMungpleMarkerList, setCertMungpleMarkerList] = useState<naver.maps.Marker[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: dummyData[0].lat,
    lng: dummyData[0].lng,
    zoom: 17,
    option: { zoom: 2, size: 70 },
  });

  let map: naver.maps.Map;

  const getMapPageData = async () => {
    await getMapData(
      0,
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        setCertMungpleList(data.certMungpleList);
        setCertNormalList(data.certNormalList);
        setMungpleList(data.mungpleList);
        console.log(response.data);
      },
      dispatch,
    );
  };

  useEffect(() => {
    getMapPageData();
    navigator.geolocation.getCurrentPosition((pos) => {
      setCurrentLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        zoom: 17,
        option: { zoom: 2, size: 70 },
      });
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (!mapElement.current || !naver) return;
    const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: currentLocation.zoom,
      zoomControl: false,
    };

    map = new naver.maps.Map(mapElement.current, mapOptions);
    const userMarkerOption = {
      position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
      map,
      icon: {
        content: [`<div class="userMarker">`, `</div>`].join(''),
        size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
        origin: new naver.maps.Point(0, 0),
      },
    };

    const userMarker = new naver.maps.Marker(userMarkerOption);
    setGlobarMap(map);
    setIsLoading(false);
    naver.maps.Event.addListener(map, 'zoom_changed', () => {
      setTimeout(() => {
        const location = map.getCenter();
        const zoom = map.getZoom();
        let option: { size: number; zoom: number } = { zoom: 2, size: 70 };
        if (zoom > 20) option = { zoom: 3, size: 100 };
        else if (zoom > 10) option = { zoom: 2, size: 70 };
        else option = { zoom: 1, size: 13 };
        setCurrentLocation({ lat: location.y, lng: location.x, zoom, option });
      }, 200);
    });
    naver.maps.Event.addListener(map, 'tap', () => {
      setSelectedId((prev) => {
        return {
          img: '',
          title: '',
          address: '',
          id: 0,
          prevId: prev.id,
          lat: 0,
          lng: 0,
          categoryCode: '0',
          prevLat: prev.lat,
          prevLng: prev.lng,
          prevCategoryCode: prev.categoryCode,
        };
      });
    });
  }, []);

  console.log(currentLocation);
  useEffect(() => {
    if (mungple === 'OFF') {
      deleteMungpleList();
      deleteCertList();
      const tempList1 = certNormalList.map((data) => {
        const markerOptions = {
          position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
          map: globarMap!,
          icon: {
            content: [
              `<div class="pin${currentLocation.option.zoom}" style="z-index:${data.certificationId}">`,
              `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
            origin: new naver.maps.Point(0, 0),
          },
        };
        const marker = new naver.maps.Marker(markerOptions);
        marker.addListener('click', () => {
          navigate(`/post/?userId=${1}&postId=${data.certificationId}`);
        });
        return marker;
      });
      setCertMarkerList(tempList1);

      const tempList2 = certMungpleList.map((data) => {
        const markerOptions = {
          position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
          map: globarMap!,
          icon: {
            content: [
              `<div class="pin${currentLocation.option.zoom} mungplepin" style="z-index:${data.certificationId}">`,
              `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
            origin: new naver.maps.Point(0, 0),
          },
        };
        const marker = new naver.maps.Marker(markerOptions);
        marker.addListener('click', () => {
          navigate(`/post/?userId=${1}&postId=${data.certificationId}`);
        });
        return marker;
      });
      setCertMungpleMarkerList(tempList2);
    } else if (mungple === 'ON') {
      deleteCertList();
      deleteMungpleList();
      const tempList = mungpleList.map((data) => {
        let markerOptions;
        if (data.categoryCode === 'CA0001') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div id=${data.mungpleId} class="mungple ${data.categoryCode}" >`,
                `<img src=${BathSmall}  style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        } else if (data.categoryCode === 'CA0002') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${CafeSmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        } else if (data.categoryCode === 'CA0003') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${BeautySmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        } else if (data.categoryCode === 'CA0004') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${WalkSmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        } else if (data.categoryCode === 'CA0005') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${HospitalSmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        } else {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${EatSmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10,10),
            },
          };
        }
        const marker = new naver.maps.Marker(markerOptions);
        marker.addListener('click', () => {
          setSelectedId((prev) => {
            return {
              img: data.photoUrl,
              title: data.placeName,
              address: data.jibunAddress,
              id: data.mungpleId,
              prevId: prev.id,
              lat: parseFloat(data.latitude),
              lng: parseFloat(data.longitude),
              categoryCode: data.categoryCode,
              prevLat: prev.lat,
              prevLng: prev.lng,
              prevCategoryCode: prev.categoryCode
            };
          });
          if(data.categoryCode === 'CA0001'){
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big" >`,
                  `<img src=${Bath} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          } else if(data.categoryCode === 'CA0002'){
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big">`,
                  `<img src=${Cafe} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          } else if(data.categoryCode === 'CA0003'){
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big" >`,
                  `<img src=${Beauty} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          } else if(data.categoryCode === 'CA0004'){
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big" >`,
                  `<img src=${Walk} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          } else if(data.categoryCode === 'CA0005'){
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big" >`,
                  `<img src=${Hospital} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          } else {
            markerOptions = {
              position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
              map: globarMap!,
              icon: {
                content: [
                  `<div class="mungple ${selectedId.prevCategoryCode} big" >`,
                  `<img src=${Eat} style="" alt="pin"/>`,
                  `</div>`,
                ].join(''),
                size: new naver.maps.Size(50, 59),
                origin: new naver.maps.Point(0, 0),
              },
            };
          }
          marker.setOptions(markerOptions);
        });
        return { marker, id: data.mungpleId };
      });
      setMarkerList(tempList);
    }
  }, [mungple, mungpleList, certMungpleList, certNormalList, currentLocation.option.zoom]);

  useEffect(() => {
    if (selectedId.prevId === selectedId.id) return;
    if (selectedId.prevId > 0) {
      const index = markerList.findIndex((e) => {
        return e.id === selectedId.prevId;
      });
      console.log(selectedId);
      let markerOptions;
      if(selectedId.prevCategoryCode === 'CA0001'){
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${BathSmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      } else if(selectedId.prevCategoryCode === 'CA0002'){
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${CafeSmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      } else if(selectedId.prevCategoryCode === 'CA0003'){
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${BeautySmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      } else if(selectedId.prevCategoryCode === 'CA0004'){
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${WalkSmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      } else if(selectedId.prevCategoryCode === 'CA0005'){
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${HospitalSmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      } else {
        markerOptions = {
          position: new window.naver.maps.LatLng(selectedId.prevLat, selectedId.prevLng),
          map: globarMap!,
          icon: {
            content: [
              `<div class="mungple ${selectedId.prevCategoryCode}" >`,
              `<img src=${EatSmall} style="" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(20, 20),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(10,10),
          },
        };
      }
      
      markerList[index].marker.setOptions(markerOptions);
    }
  }, [selectedId]);

  console.log(selectedId);

  const mapStyle = {
    width: '100vw',
    height: '80vh',
  };

  const mungpleButtonHandler = () => {
    if (mungple === 'ON') setMungple('OFF');
    else {
      setMungple('ON');
    }
  };

  const setCenterUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      globarMap?.panTo(new window.naver.maps.LatLng(pos.coords.latitude, pos.coords.longitude), {
        duration: 500,
        easing: 'easeOutCubic',
      });
      setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const deleteMungpleList = () => {
    markerList.forEach((marker) => {
      marker.marker.setMap(null);
    });
  };
  const deleteCertList = () => {
    certMarkerList.forEach((marker) => {
      marker.setMap(null);
    });
    certMungpleMarkerList.forEach((marker) => {
      marker.setMap(null);
    });
  };

  return (
    <div>
      <RecordHeader />
      <div ref={mapElement} style={mapStyle}>
        <div aria-hidden="true" className="userLocation" onClick={setCenterUserLocation}>
          <img src={UserLocation} alt="user-location" />
        </div>
        {!isLoading && (
          <div
            aria-hidden="true"
            onClick={mungpleButtonHandler}
            className={classNames('mungplace-toggle', { mungpleOff: mungple !== 'ON' })}
          >
            {`멍플 ${mungple}`}
          </div>
        )}
      </div>
      {selectedId.title.length > 0 && (
        <PlaceCard img={selectedId.img} title={selectedId.title} address={selectedId.address} />
      )}
      <FooterNavigation />
    </div>
  );
}

export default MapPage;
