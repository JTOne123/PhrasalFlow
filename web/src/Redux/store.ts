import { configureStore } from '@reduxjs/toolkit';
import verbReducer from '../Redux/verbSlice';

export const store = configureStore({
  reducer: {
    verbs: verbReducer,
  }
});