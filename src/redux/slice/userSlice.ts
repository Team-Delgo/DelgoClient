import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
  user: {
    id: 0,
    address: '',
    nickname: '',
    email: '',
    phone: '',
    isSocial: false,
    geoCode: 0,
    pGeoCode: 0,
    registDt: '',
    notify: true
  },
  pet: { name: '', petId: 0, birthday: '', breed: '', breedName:'', image: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin(state, action) {
      return {
        isSignIn: true,
        user: action.payload.user,
        pet: action.payload.pet,
      };
    },
    signout() {
      return initialState;
    },
    setpetprofile(state, action) {
      return {
        isSignIn: state.isSignIn,
        user: state.user,
        pet: {
          ...state.pet,
          image: action.payload.image,
        },
      };
    },
    changepetinfo(state, action) {
      return {
        isSignIn: state.isSignIn,
        user: state.user,
        pet: {
          name: action.payload.name,
          birthday: action.payload.birth,
          breed: action.payload.breed,
          breedName: action.payload.breedName,
          petId: state.pet.petId,
          image: action.payload.image,
        },
      };
    },
    changeGeoCode(state, action){
      return {
        isSignIn: state.isSignIn,
        user: {
          ...state.user,
          address: action.payload.address,
          geoCode: action.payload.geoCode,
          pGeoCode: action.payload.pGeoCode,
        },
        pet: state.pet
      }
    },
    changeNickName(state, action){
      return {
        isSignIn: state.isSignIn,
        user: {
          ...state.user,
          nickname: action.payload.name
        },
        pet: state.pet
      }
    },
    changeNotification(state, action){
      return {
        ...state,
        user: {
          ...state.user,
          notify: action.payload.notify
        }
      }
    }
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
