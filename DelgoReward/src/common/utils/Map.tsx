/* global kakao */
import React, { useEffect } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

interface addressProps {
  address:string
}

function Map({address}:addressProps) {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new window.kakao.maps.LatLng(0, 0),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new window.kakao.maps.services.Geocoder();


    geocoder.addressSearch(address, function (result: any, status: any) {
      // 정상적으로 검색이 완료됐으면
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        const marker = new window.kakao.maps.Marker({
          map,
          position: coords,
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        // const infowindow = new window.kakao.maps.InfoWindow({
        //     content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
        // });
        // infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      }
      else{
        alert('그런 주소는 없습니다')
      }
    });
  }, [])

  return (
    <div
      id="myMap"
      style={{
        width: '100%',
        height: '250px',
      }}
    >
      {' '}
    </div>
  );
}

export default Map;
