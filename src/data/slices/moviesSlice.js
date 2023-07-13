import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FETCH_STATUS } from '../../common/constants';

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl);
  return response.json();
});

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    fetchStatus: '',
  },
  reducers: {
    removeAllMovies: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => ({
        fetchStatus:
          action.payload.success === false
            ? FETCH_STATUS.error
            : FETCH_STATUS.success,
        movies: [...state.movies, ...(action.payload?.results || [])],
      }))
      .addCase(fetchMovies.pending, (state) => {
        state.fetchStatus = FETCH_STATUS.loading;
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = FETCH_STATUS.error;
      });
  },
});

export default moviesSlice;
