import { useNavigate } from "react-router-dom";
import { Cert } from "./MapType";

export function markerRender(certNormalList: Cert[], certMungpleList: Cert[], zoom: number, map: naver.maps.Map) {
  const navigate = useNavigate();

  if (zoom === 1) {
    certNormalList.forEach((data) => {
      console.log(parseFloat(data.latitude), parseFloat(data.longitude));

      const markerOptions = {
        // position: new window.naver.maps.LatLng(parseFloat(data.longitude), parseFloat(data.latitude)),
        position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
        map,
        icon: {
          content: [
            `<div class="pin1" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(70, 70),
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
            `<div class="pin1 mungplepin" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(50, 50),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.certificationId}`) });
    })
  } else if (zoom === 2) {
    certNormalList.forEach((data) => {
      console.log(parseFloat(data.latitude), parseFloat(data.longitude));

      const markerOptions = {
        // position: new window.naver.maps.LatLng(parseFloat(data.longitude), parseFloat(data.latitude)),
        position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
        map,
        icon: {
          content: [
            `<div class="pin2" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(50, 50),
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
            `<div class="pin2 mungplepin" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(70, 70),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.certificationId}`) });
    })
  } else {
    certNormalList.forEach((data) => {
      console.log(parseFloat(data.latitude), parseFloat(data.longitude));

      const markerOptions = {
        // position: new window.naver.maps.LatLng(parseFloat(data.longitude), parseFloat(data.latitude)),
        position: new window.naver.maps.LatLng(parseFloat(data.latitude), parseFloat(data.longitude)),
        map,
        icon: {
          content: [
            `<div class="pin3" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(100, 100),
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
            `<div class="pin3 mungplepin" style="z-index:${data.certificationId}">`,
            `<img src=${data.photoUrl} style="z-index:${data.certificationId + 1}" alt="pin"/>`,
            `</div>`
          ].join(''),
          size: new naver.maps.Size(100, 100),
          origin: new naver.maps.Point(0, 0),
        }
      };
      const marker = new naver.maps.Marker(markerOptions);
      marker.addListener('click', () => { navigate(`/post/?userId=${1}&postId=${data.certificationId}`) });
    })
  }

};

