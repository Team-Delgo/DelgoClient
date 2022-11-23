import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hasError: false,
  tokenExpried: false,
};

const errorSlice = createSlice({
  name: 'hasError',
  initialState,
  reducers: {
    setError(state) {
      return {
        ...state,
        hasError: true,
      };
    },
    setFine(state) {
      return {
        ...state,
        hasError: false,
      };
    },
    setTokenExpriedError(state) {
      return {
        ...state,
        tokenExpried: true,
      };
    },
    setTokenFine(state) {
      return {
        ...state,
        tokenExpried: false,
      };
    },
  },
});

export const errorActions = errorSlice.actions;
export default errorSlice.reducer;