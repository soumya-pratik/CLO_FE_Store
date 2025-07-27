import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface FilterSlice{
  isLoading: boolean,
  search: string,
  sortBy: string,
  filter: [],
}


const initialState: FilterSlice = {
    isLoading: false,
    search: '',
    filter: [],
    sortBy: ''
}

export const filterSlice = createSlice 
({
  name: 'filters',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    search: (state, action) => {
        state.search = action.payload;
        // state.isLoading = true;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
      // state.isLoading = true;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    resetSearch: (state) => {
      state.search = '';
      state.isLoading = false;
    },
    resetFilter: (state) => {
      state.filter = [];
      state.isLoading = false;
    },
    resetSortBy: (state) => {
      state.sortBy = 'name';
      state.isLoading = false;
    },
  },
})

export const { search, setFilter, loading, resetSearch, resetFilter, setSortBy, resetSortBy } = filterSlice.actions


export default filterSlice.reducer