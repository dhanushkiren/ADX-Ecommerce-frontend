import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchQuery: '',
  sortBy: '',
  filter: {},
  searchResults: [],
  isLoading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    fetchSearchResultsStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    fetchSearchResultsSuccess(state, action) {
      state.isLoading = false;
      state.searchResults = action.payload;
    },
    fetchSearchResultsFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearSearch(state) {
      state.searchQuery = '';
      state.searchResults = [];
      state.sortBy = '';
      state.filter = {};
    },
  },
});

export const {
  setSearchQuery,
  setSortBy,
  setFilter,
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchResultsFailure,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
