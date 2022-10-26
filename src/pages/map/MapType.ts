export interface Cert{
  categoryCode:string;
  certificationId:number;
  description:string;
  geoCode:string;
  isPhotoChecked:number;
  latitude:string;
  longitude:string;
  mungpleId:number;
  p_geoCode:string;
  photoUrl:string;
  placeName:string;
  registDt:string;
  userId:number;
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