import { configureStore } from '@reduxjs/toolkit';
import artWorkReducer from './artWorkSlice';

const store = configureStore({
  reducer: {
    artWorkReducer,
  },
});

export default store;
