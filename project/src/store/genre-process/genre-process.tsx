import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { GenreProcess } from '../../types/state';

const initialState: GenreProcess = {
  genre: INITAL_FILMS_GENRE,
  renderedFilmCount: CARDS_PER_STEP,
};

export const genreProcess = createSlice({
  name: NameSpace.Genre,
  initialState,
  reducers: {
    showAnotherGenre: (state: GenreProcess, action: { payload: string }) => {
      state.genre = action.payload;
      state.renderedFilmCount = CARDS_PER_STEP;
    },
    showMoreFilms: (state: GenreProcess, action: { payload: number }) => {
      state.renderedFilmCount = action.payload;
    },
    resetFilmsList: (state: GenreProcess, action: { payload: { filmsToShow: number, genre: string } }) => {
      state.renderedFilmCount = action.payload.filmsToShow;
      state.genre = action.payload.genre;
    }
  },
  extraReducers: {}
});

export const { showAnotherGenre, showMoreFilms, resetFilmsList } = genreProcess.actions;
