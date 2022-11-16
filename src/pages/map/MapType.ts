export interface Cert{
  categoryCode:string;
  address:string;
  certificationId:number;
  description:string;
  geoCode:string;
  isPhotoChecked:number;
  latitude:string;
  isLike:number;
  longitude:string;
  likeCount:number;
  commentCount:number;
  mungpleId:number;
  p_geoCode:string;
  photoUrl:string;
  placeName:string;
  registDt:string;
  userId:number;
}
export const certDefault:Cert = {
  categoryCode:'',
  certificationId:0,
  description:'',
  likeCount:0,
  commentCount:0,
  isLike:0,
  address:'',
  geoCode:'',
  isPhotoChecked:0,
  latitude:'',
  longitude:'',
  mungpleId:0,
  p_geoCode:'',
  photoUrl:'',
  placeName:'',
  registDt:'',
  userId:0
};

export const idDefault = {
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
}

export interface Mungple{
  categoryCode:string;
  geoCode:string;
  jibunAddress:string;
  latitude:string;
  longitude:string;
  mungpleId:number;
  p_geoCode:string;
  placeName:string;
  registDt:string;
  roadAddress:string;
  photoUrl:string;
}