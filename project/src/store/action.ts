import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const showAnotherGenre = createAction('films/showAnotherGenre', (value) => ({
  payload: value,
}));

export const showMoreFilms = createAction('films/showMoreFilms', (value) => ({
  payload: value,
}));

export const resetFilmsList = createAction('films/resetFilmsList', (value) => ({
  payload: value,
}));

export const setError = createAction('user/setError',(value) => ({
  payload: value,
}));

export const setFilm = createAction('film/setFilm',(value) => ({
  payload: value,
}));

export const redirectToRoute = createAction<AppRoute>('film/redirectToNotFound');
