import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export enum PricingOption {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}
export interface OutfitState{
    creator: string,
    id: string
    imagePath: string,
    price: number,
    pricingOption: number
    title: string,
}

interface OutfitsState{
  masterList: OutfitState[],
  outfits: OutfitState[],
  isLoading: boolean,
}

const initialState: OutfitsState = {
    masterList: [],
    outfits: [],
    isLoading: false,
}

export const outfitSlice = createSlice 
({
  name: 'outfits',
  initialState,
  reducers: {
    addToMaster: (state, action) => {
        state.masterList = state.masterList.concat(action.payload);
        state.outfits = state.outfits.concat(action.payload);
        state.isLoading = false;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    setOutfits:  (state, action) => {
      state.outfits = action.payload;
      state.isLoading = false;
    },
  },  
})

export const { addToMaster, loading, setOutfits } = outfitSlice.actions

export default outfitSlice.reducer