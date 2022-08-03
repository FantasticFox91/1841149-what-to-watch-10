import { createAction } from '@reduxjs/toolkit';

export const showAnotherGenre = createAction('films/showAnotherGenre', (value) => ({
  payload: value,
}));

export const showMoreFilms = createAction('films/showMoreFilms', (value) => ({
  payload: value,
}));

export const resetFilmsList = createAction('films/resetFilmsList', (value) => ({
  payload: value,
}));
