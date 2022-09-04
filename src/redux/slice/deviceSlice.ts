import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  OS : '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    android() {
      return {
        OS : 'android'
      };
    },
    ios() {
      return {
        OS : 'ios',
      };
    },
    
  },
});

export const deviceAction = deviceSlice.actions;
export default deviceSlice.reducer;
