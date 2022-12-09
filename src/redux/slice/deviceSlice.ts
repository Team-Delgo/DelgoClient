import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  OS : '',
  width:window.innerWidth,
  height:window.innerHeight
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    android() {
      return {
        ...initialState,
        OS : 'android'
      };
    },
    ios() {
      return {
        ...initialState,
        OS : 'ios',
      };
    },
    
  },
});

export const deviceAction = deviceSlice.actions;
export default deviceSlice.reducer;
