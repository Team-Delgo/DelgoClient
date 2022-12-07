import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios, { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import FooterNavigation from '../../common/components/FooterNavigation';
import RecordHeader from '../../common/components/RecordHeader';
import './MapPage.scss';
import park from './park.jpg';
import { dummyData } from './dummypin';
import { getMapData } from '../../common/api/record';
import { Mungple, Cert, certDefault, idDefault, WardOffice } from './MapType';
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
import UserPin from '../../common/icons/userpin.svg';
import MungpleToggle from './MungpleToggle';
import CertCard from './CertCard';
import Flag from '../../common/icons/flag.svg';
import { NEIGHBOR_RANKING_PATH, ROOT_PATH } from '../../common/constants/path.const';
import FlagCard from './FlagCard';
import { CACHE_TIME, GET_MY_PET_RANKING_DATA, GET_TOP_RANKING_LIST, STALE_TIME } from '../../common/constants/queryKey.const';
import { getMyPetRanking, getTopRankingList } from '../../common/api/ranking';
import { useErrorHandlers } from '../../common/api/useErrorHandlers';

interface MakerItem {
  id: number;
  marker: naver.maps.Marker;
}

function MapPage() {
  const mapElement = useRef(null);
  const userId = useSelector((state: any) => state.persist.user.user.id);
  const geoCode = useSelector((state: any) => state.persist.user.user.geoCode);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mungple, setMungple] = useState('ON');
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [globarMap, setGlobarMap] = useState<naver.maps.Map>();
  const [certNormalList, setCertNormalList] = useState<Cert[]>([]);
  const [certMungpleList, setCertMungpleList] = useState<Cert[]>([]);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [selectedCert, setSelectedCert] = useState<Cert>(certDefault);
  const [selectedId, setSelectedId] = useState(idDefault);
  const [flagClicked, setFlagClicked] = useState(false);
  const [mungpleList, setMungpleList] = useState<Mungple[]>([]);
  const [currentZoom, setCurrentZoom] = useState({ zoom: 2, size: 70 });
  const [test, setTest] = useState({ value: 1 });
  const [markerList, setMarkerList] = useState<MakerItem[]>([]);
  const [wardOffice, setWardOffice] = useState<WardOffice>();
  const [certMarkerList, setCertMarkerList] = useState<naver.maps.Marker[]>([]);
  const [certMungpleMarkerList, setCertMungpleMarkerList] = useState<naver.maps.Marker[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    lat: dummyData[0].lat,
    lng: dummyData[0].lng,
    zoom: 17,
    option: { zoom: 2, size: 70 },
  });

  let map: naver.maps.Map;

  const {isLoading: getTopRankingListIsLoading, data: topRankingDataList} = useQuery(
    GET_TOP_RANKING_LIST,
    () => getTopRankingList(Number(geoCode)),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error:any) => {
        useErrorHandlers(dispatch, error);
      }
    }
  )

  const { isLoading: getMyPetRankingDataIsLoading, data: myPetRankingData } = useQuery(
    GET_MY_PET_RANKING_DATA,
    () => getMyPetRanking(userId),
    {
      cacheTime: CACHE_TIME,
      staleTime: STALE_TIME,
      onError: (error: any) => {
        useErrorHandlers(dispatch, error);
      },
    },
  );

  const clearSelectedId = () => {
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
  };

  const getMapPageData = async () => {
    await getMapData(
      userId,
      (response: AxiosResponse) => {
        const { code, data } = response.data;
        console.log(data);
        setWardOffice(data.wardOffice);
        setCertMungpleList(data.certMungpleList);
        setCertNormalList(data.certNormalList);
        setMungpleList(data.mungpleList);
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
    const userMarkerOption = {
      position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
      map: globarMap!,
      icon: {
        content: [`<div class="userMarker">`, `<img src=${UserPin} alt="user"/>`, `</div>`].join(''),
        size: new naver.maps.Size(33, 33),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(16, 16),
      },
    };
    const userMarker = new naver.maps.Marker(userMarkerOption);
    globarMap?.panTo(new window.naver.maps.LatLng(userLocation.lat, userLocation.lng), {
      duration: 500,
      easing: 'easeOutCubic',
    });
  }, [userLocation]);

  useEffect(() => {
    if (!mapElement.current || !naver) return;
    const location = new window.naver.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const mapOptions: naver.maps.MapOptions = {
      center: location,
      zoom: currentLocation.zoom,
      zoomControl: false,
    };

    map = new naver.maps.Map(mapElement.current, mapOptions);

    setGlobarMap(map);
    setIsLoading(false);
    naver.maps.Event.addListener(map, 'tap', () => {
      clearSelectedId();
      setSelectedCert(certDefault);
      setFlagClicked(false);
    });
  }, []);

  console.log(flagClicked);

  useEffect(() => {
    if (wardOffice) {
      const markerOptions = {
        position: new window.naver.maps.LatLng(parseFloat(wardOffice.latitude), parseFloat(wardOffice.longitude)),
        map: globarMap!,
        icon: {
          content: [
            `<div class="wardOffice" style="z-index:9998">`,
            `<div class="wardOffice-name">${wardOffice.name.slice(0, -1)}</div>`,
            `<img src=${Flag} style="z-index:9999" alt="pin"/>`,
            `</div>`,
          ].join(''),
          size: new naver.maps.Size(63, 75),
          origin: new naver.maps.Point(0, 0),
        },
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => {
        setFlagClicked(true);
        clearSelectedId();
        setSelectedCert(certDefault);
      });
    }
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
          setSelectedCert((prev) => {
            return {
              ...prev,
              userId: data.userId,
              isLike: data.isLike,
              likeCount: data.likeCount,
              commentCount: data.commentCount,
              categoryCode: data.categoryCode,
              certificationId: data.certificationId,
              description: data.description,
              photoUrl: data.photoUrl,
              placeName: data.placeName,
              registDt: data.registDt,
            };
          });
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
              `<div class="pin${currentLocation.option.zoom} mungplepin ${data.categoryCode}" style="z-index:${data.certificationId}">`,
              `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
              `</div>`,
            ].join(''),
            size: new naver.maps.Size(currentLocation.option.size, currentLocation.option.size),
            origin: new naver.maps.Point(0, 0),
          },
        };
        const marker = new naver.maps.Marker(markerOptions);
        marker.addListener('click', () => {
          setSelectedCert((prev) => {
            return {
              ...prev,
              categoryCode: data.categoryCode,
              certificationId: data.certificationId,
              description: data.description,
              photoUrl: data.photoUrl,
              placeName: data.placeName,
              registDt: data.registDt,
            };
          });
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
                `<img src=${WalkSmall}  style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10, 10),
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
              anchor: new naver.maps.Point(10, 10),
            },
          };
        } else if (data.categoryCode === 'CA0003') {
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
              anchor: new naver.maps.Point(10, 10),
            },
          };
        } else if (data.categoryCode === 'CA0004') {
          markerOptions = {
            position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
            map: globarMap!,
            icon: {
              content: [
                `<div class="mungple ${data.categoryCode}" >`,
                `<img src=${BathSmall} style="" alt="pin"/>`,
                `</div>`,
              ].join(''),
              size: new naver.maps.Size(20, 20),
              origin: new naver.maps.Point(0, 0),
              anchor: new naver.maps.Point(10, 10),
            },
          };
        } else if (data.categoryCode === 'CA0005') {
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
              anchor: new naver.maps.Point(10, 10),
            },
          };
        } else {
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
              anchor: new naver.maps.Point(10, 10),
            },
          };
        }
        const marker = new naver.maps.Marker(markerOptions);
        //  선택된 한개의 마커 변경
        // - 선택된 마커 찾기
        // - 선택된 마커 바꾸기
        // - 선택된 마커 기억하기
        // 다른 것을 선택하면 기존의 마커 원래대로
        // - 기억했던 마커 찾기
        // - 기억했던 마커 바꾸기
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
              prevCategoryCode: prev.categoryCode,
            };
          });
          if (data.categoryCode === 'CA0001') {
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
          } else if (data.categoryCode === 'CA0002') {
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
          } else if (data.categoryCode === 'CA0003') {
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
          } else if (data.categoryCode === 'CA0004') {
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
          } else if (data.categoryCode === 'CA0005') {
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
          } else {
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
          }
          marker.setOptions(markerOptions);
        });
        return { marker, id: data.mungpleId };
      });
      setMarkerList(tempList);
    }
  }, [mungple, mungpleList, certMungpleList, certNormalList, wardOffice]);

  useEffect(() => {
    if (selectedId.prevId === selectedId.id) return;
    if (selectedId.prevId > 0) {
      const index = markerList.findIndex((e) => {
        return e.id === selectedId.prevId;
      });
      let markerOptions;
      if (selectedId.prevCategoryCode === 'CA0001') {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      } else if (selectedId.prevCategoryCode === 'CA0002') {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      } else if (selectedId.prevCategoryCode === 'CA0003') {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      } else if (selectedId.prevCategoryCode === 'CA0004') {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      } else if (selectedId.prevCategoryCode === 'CA0005') {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      } else {
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
            anchor: new naver.maps.Point(10, 10),
          },
        };
      }

      markerList[index].marker.setOptions(markerOptions);
    }
  }, [selectedId]);

  const mungpleButtonHandler = () => {
    setMungple('OFF');
    setSelectedId(idDefault);
    setFlagClicked(false);
  };
  const munpleOnButtonHandler = () => {
    setMungple('ON');
    setSelectedCert(certDefault);
    setFlagClicked(false);
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

  const moveToRankingPage = () => {
    console.log(topRankingDataList, myPetRankingData);
    navigate(NEIGHBOR_RANKING_PATH, {
      state: {
        topRankingDataList: topRankingDataList?.data,
        myPetRankingData: myPetRankingData?.data,
      }
    })
  };

  return (
    <div>
      <RecordHeader />
      <div className="map" ref={mapElement} style={{ position: 'absolute' }}>
        <div aria-hidden="true" className="userLocation" onClick={setCenterUserLocation}>
          <img src={UserLocation} alt="user-location" />
        </div>
        <MungpleToggle selected={mungple !== 'ON'} on={munpleOnButtonHandler} off={mungpleButtonHandler} />
      </div>
      {selectedId.title.length > 0 && (
        <PlaceCard
          img={selectedId.img}
          title={selectedId.title}
          address={selectedId.address}
          categoryCode={selectedId.categoryCode}
        />
      )}
      {selectedCert.placeName.length > 0 && (
        <CertCard
          cert={selectedCert}
          img={selectedCert.photoUrl}
          title={selectedCert.placeName}
          categoryCode={selectedCert.categoryCode}
          registDt={selectedCert.registDt}
          description={selectedCert.description}
        />
      )}
      {flagClicked && <FlagCard place={wardOffice!.name.slice(0, -1)} onClick={moveToRankingPage}/>}
      {/* <FooterNavigation /> */}
    </div>
  );
}

export default MapPage;
