import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSignIn: false,
  user: { id: 0, address: '', nickname: '', email: '', phone: '', isSocial: false, geoCode: 0, pGeoCode: 0 },
  pet: { name: '', petId: 0, birthday: '', size: '', image: '' },
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
          size: action.payload.size,
          petId: state.pet.petId,
          image: action.payload.image,
        },
      };
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
