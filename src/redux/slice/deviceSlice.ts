import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  OS : '',
  device:'mobile'
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    android(state) {
      return {
        ...state,
        OS : 'android'
      };
    },
    ios(state) {
      return {
        ...state,
        OS : 'ios',
      };
    },
    pc(state) {
      return {
        ...state,
        device : 'pc'
      };
    },
    mobile(state) {
      return {
        ...state,
        device : 'mobile',
      };
    },
  },
});

export const deviceAction = deviceSlice.actions;
export default deviceSlice.reducer;
