import { configureStore } from '@reduxjs/toolkit';
import outfitsReducer from './slices/outfitsSlice';
import filterReducer from './slices/filterSlice';

const store = configureStore({
  reducer: {
    outfits: outfitsReducer,
    filters: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store