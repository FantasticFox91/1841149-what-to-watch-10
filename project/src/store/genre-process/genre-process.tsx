import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, GENRE_TABS, CARDS_PER_STEP } from '../../const';
import { GenreProcess } from '../../types/state';
import { showAnotherGenre, showMoreFilms, resetFilmsList } from '../action';

const initialState: GenreProcess = {
  genre: GENRE_TABS.ALL,
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
