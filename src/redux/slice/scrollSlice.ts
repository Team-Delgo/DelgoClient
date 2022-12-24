import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  posts: {
    scroll: 0,
    pageSize: 3,
  },
  photos: {
    scroll: 0,
    pageSize: 0,
  },
  calendar: {
    scroll: 0,
  },
  map: {
    x: 0,
    y: 0,
    zoom: 0,
  }
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
    calendarScroll(state, action) {
      return {
        ...initialState,
        calendar: {
          scroll: action.payload.scroll,
        },
      };
    },
    scrollInit() {
      return initialState;
    },
    setMapCenter(state, action) {
      return {
        ...initialState,
        map: {
          x: action.payload.x,
          y: action.payload.y,
          zoom: action.payload.zoom,
        }
      }
    },
  },
});

export const scrollActions = scrollSlice.actions;
export default scrollSlice.reducer;
