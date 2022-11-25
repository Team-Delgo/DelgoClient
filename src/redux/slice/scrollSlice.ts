import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    scroll: 0,
    pageSize: 3,
  },
  photos: {
    scroll: 0,
    pageSize: 3,
  },
};

const scrollSlice = createSlice({
  name: 'scrollY',
  initialState,
  reducers: {
    postsScroll(state, action) {
      return {
        ...initialState,
        posts: {
          scroll: action.payload.scroll,
          pageSize: action.payload.pageSize,
        },
      };
    },
    photosScroll(state, action) {
      return {
        ...initialState,
        photos: {
          scroll: action.payload.scroll,
          pageSize: action.payload.pageSize,
        },
      };
    },
    scrollInit() {
      return initialState;
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;
