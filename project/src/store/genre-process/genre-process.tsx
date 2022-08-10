import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { GenreProcess } from '../../types/state';
import { showAnotherGenre, showMoreFilms, resetFilmsList } from '../action';

const initialState: GenreProcess = {
  genre: INITAL_FILMS_GENRE,
  renderedFilmCount: CARDS_PER_STEP,
};

export const genreProcess = createSlice({
  name: NameSpace.Genre,
  initialState,
  reducers: {},
  extraReducers(builder) {
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
  }
});
