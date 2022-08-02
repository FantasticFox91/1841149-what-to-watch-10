import { createReducer } from '@reduxjs/toolkit';
import { resetFilmsList, showAnotherGenre, showMoreFilms, loadFilms, setDataLoadedStatus, requireAuthorization, loadPromo, loadFilm, loadSimilarFilms, setError, loadFilmComments } from './action';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE, AuthorizationStatus } from '../const';
import { Film } from '../types/films';
import { ReviewData } from '../types/review-data';

type InitialState = {
  genre: string;
  films: Film[],
  filmComments: ReviewData[] | [],
  promoFilm: Film | null,
  renderedFilmCount: number,
  isDataLoading: boolean;
  authorizationStatus: AuthorizationStatus,
  film: Film | null,
  similarFilms: Film[],
  error: string | null | unknown,
}

const initialState: InitialState = {
  genre: INITAL_FILMS_GENRE,
  films: [],
  promoFilm: null,
  renderedFilmCount: 8,
  isDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  film: null,
  filmComments: [],
  similarFilms: [],
  error: null,
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
    .addCase(loadFilmComments, (state, action) => {
      state.filmComments = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
