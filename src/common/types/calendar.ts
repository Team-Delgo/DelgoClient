import {Cert} from "./map";

interface DateList{
  categoryCode:string;
  certificationId:number;
  description:string;
  geoCode:string;
  isPhotoChecked:boolean;
  latitude:string;
  logitude:string;
  munpleId:number;
  p_geoCode:string;
  photoUrl:string;
  placeName:string;
  registDt:string;
  userId:number;
}

export interface DateType{
  date:string;
  dateList:Cert[];
  isAchievements:boolean;
}

