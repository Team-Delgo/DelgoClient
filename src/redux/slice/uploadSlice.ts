import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  img: '',
  latitude: '',
  longitude: '',
  categoryKo: '',
  title:'',
  content:'',
  registDt:'',
  mongPlaceId:-1,
};

const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
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
        // latitude: '',
        // longitude: '',
        // categoryKo: '',
        // title: '',
        // content: '',
        // registDt:'',
        // mongPlaceId:-1,
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
        mongPlaceId: action.payload.mongPlaceId,
      };
    },
    setTitleContentRegistDt(state, action) {
      return {
        ...state,
        title: action.payload.title,
        content: action.payload.content,
        registDt: action.payload.registDt,
      };
    },
    setUploadInit() {
      return {
        ...initialState,
      };
    },
  },
});

export const uploadAction = uploadSlice.actions;
export default uploadSlice.reducer;
