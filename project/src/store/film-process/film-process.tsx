import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import { fetchFilm, fetchFilmComments, fetchSimilarFilms, fetchPromoAction } from '../api-actions';

const initialState: FilmProcess = {
  promoFilm: null,
  film: null,
  filmComments: [],
  similarFilms: [],
  isDataLoading: false,
};

export const filmProcess = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilm.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFilmComments.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmComments.fulfilled, (state, action) => {
        state.filmComments = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoading = false;
      });
  }
});
