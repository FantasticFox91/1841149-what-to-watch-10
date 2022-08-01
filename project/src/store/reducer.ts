import { createReducer } from '@reduxjs/toolkit';
import { resetFilmsList, showAnotherGenre, showMoreFilms, loadFilms, setDataLoadedStatus, requireAuthorization, loadPromo, loadFilm, loadSimilarFilms } from './action';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE, AuthorizationStatus } from '../const';
import { Film } from '../types/films';

type InitialState = {
  genre: string;
  films: Film[],
  promoFilm: Film | null,
  renderedFilmCount: number,
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus,
  film: Film | null,
  similarFilms: Film[],
}

const initialState: InitialState = {
  genre: INITAL_FILMS_GENRE,
  films: [],
  promoFilm: null,
  renderedFilmCount: 8,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  film: null,
  similarFilms: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(showAnotherGenre, (state, action) => {
      state.genre = action.payload;
      state.renderedFilmCount = CARDS_PER_STEP;
    })
    .addCase(showMoreFilms, (state, action) => {
      state.renderedFilmCount = action.payload;
    })
    .addCase(resetFilmsList, (state, action) => {
      state.renderedFilmCount = action.payload.filmsToShow;
      state.genre = action.payload.genre;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoading = action.payload;
    });
});

export {reducer};
