export interface postType {
  address: string;
  categoryCode: string;
  certificationId: number;
  commentCount: number;
  description: string;
  geoCode: string;
  isAchievements: boolean;
  isLike: boolean;
  isLive: boolean;
  isPhotoChecked: boolean;
  latitude: string;
  likeCount: number;
  longitude: string;
  mungpleId: number;
  pgeoCode: string;
  photoUrl: string;
  placeName: string;
  registDt: string;
  userId: number;
  user: userType;
}

export interface userType {
  address: string;
  appleUniqueNo: null;
  email: string;
  geoCode: string;
  name: string;
  password: string;
  pgeoCode: string;
  phoneNo: string;
  profile: string;
  registDt: string;
  userId: number;
  userSocial: string;
}
