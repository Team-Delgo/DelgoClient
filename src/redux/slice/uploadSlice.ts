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
  achievements:Array<AchievementType>
}
interface AchievementType {
  achievementsId: number;
  desc: string;
  imgUrl: string;
  isActive: boolean;
  isMain: number;
  isMungple: boolean;
  name: string;
  registDt: string;
  achievementsCondition: Array<AchievementsConditionType>;
}

interface AchievementsConditionType {
  achievementsConditionId: number;
  mungpleId: number;
  categoryCode: string;
  count: number;
  conditionCheck: boolean;
  registDt: string;
}

const initialState: initialStateType = {
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
  achievements: [],
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
        achievements: action.payload.achievements,
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
    initAchievements(state) {
      return {
        ...state,
        achievements: [],
      };
    }
  },
});

export const uploadAction = uploadSlice.actions;
export default uploadSlice.reducer;
