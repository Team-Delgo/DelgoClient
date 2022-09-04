import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import errorSlice from './slice/errorSlice';
import deviceSlice from './slice/deviceSlice';


const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  error: errorSlice,
  device: deviceSlice
});


const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: { persist: persistedReducer },
  devTools: process.env.NODE_ENV !== 'production',
});
export type RootState = ReturnType<typeof store.getState>
export default store;




