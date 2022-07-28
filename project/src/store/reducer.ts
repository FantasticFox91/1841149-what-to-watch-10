import { createReducer } from '@reduxjs/toolkit';
import { resetFilmsList, showAnotherGenre, showMoreFilms } from './action';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../const';
import { FILMS } from '../mocks/films';

const initialState = {
  genre: INITAL_FILMS_GENRE,
  films: FILMS,
  renderedFilmCount: 8,
  filmsToShow: [],
  favouriteFilms: FILMS.filter((film) => film.isFavorite).length,
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
    });
});

export {reducer};
