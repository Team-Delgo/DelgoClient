import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
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
        posts: {
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
