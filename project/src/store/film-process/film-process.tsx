import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { FilmProcess } from '../../types/state';
import { setFilm } from '../action';
import { fetchFilm, fetchFilmComments, fetchSimilarFilms, fetchPromoAction } from '../api-actions';
import { toast } from 'react-toastify';

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
      .addCase(fetchFilm.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find film. Please try again later.');
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchSimilarFilms.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchSimilarFilms.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find similar films. Please try again later.');
      })
      .addCase(fetchSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchFilmComments.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchFilmComments.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find comments for this film. Please try again later.');
      })
      .addCase(fetchFilmComments.fulfilled, (state, action) => {
        state.filmComments = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isDataLoading = false;
        toast('Opsie.....something get wrong, can\'t find promo film. Please try again later.');
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoading = false;
      })
      .addCase(setFilm, (state, action) => {
        state.film = action.payload;
      });
  }
});
