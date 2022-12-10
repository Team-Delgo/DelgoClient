import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  img: string,
  latitude: string,
  longitude: string,
  categoryKo: string,
  title: string,
  content: string,
  registDt: string,
  mongPlaceId: number,
  certificationId: number,
  tool: string,
  file: string,
  address: string,
  achievements:Array<achievementType>
}
interface achievementType {
  achievementsId: number,
  imgUrl: string,
  isActive: boolean,
  isMain: number,
  isMungple: boolean,
  name: string,
  registDt: string,
}

const initialState:initialStateType = {
  img: '',
  latitude: '',
  longitude: '',
  categoryKo: '',
  title: '',
  content: '',
  registDt: '',
  mongPlaceId: -1,
  certificationId: 0,
  tool: '',
  file: '',
  address: '',
  achievements: [
    // {
    //   achievementsId: 0,
    //   imgUrl: '',
    //   isActive: false,
    //   isMain: 0,
    //   isMungple: false,
    //   name: '',
    //   registDt: '',
    // },
  ],
  // file: {} as Blob,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setUploadInit() {
      return {
        ...initialState,
      };
    },
    setLocation(state, action) {
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    },
    setImg(state, action) {
      return {
        ...initialState,
        img: action.payload.img,
        tool: action.payload.tool,
        file: action.payload.file,
      };
    },
    setCategory(state, action) {
      return {
        ...state,
        categoryKo: action.payload.category,
      };
    },
    setMongPlace(state, action) {
      return {
        ...state,
        title: action.payload.placeName,
        mongPlaceId: action.payload.mungpleId,
      };
    },
    setContentRegistDtCertificationIdAddress(state, action) {
      return {
        ...state,
        content: action.payload.content,
        registDt: action.payload.registDt,
        certificationId: action.payload.certificationId,
        address: action.payload.address,
      };
    },
    setAchievements(state, action) {
      return {
        ...state,
        achievements: action.payload.achievements,
      };
    },
    setContent(state, action) {
      return {
        ...state,
        content: action.payload.content,
      };
    },
    setCertificationUpdate(state, action) {
      return {
        ...initialState,
        img: action.payload.img,
        categoryKo: action.payload.categoryKo,
        title: action.payload.title,
        certificationId: action.payload.certificationId,
        content: action.payload.content,
      };
    },
  },
});

export const uploadAction = uploadSlice.actions;
export default uploadSlice.reducer;
