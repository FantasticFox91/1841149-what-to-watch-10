import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';

export const setFilm = createAction('film/setFilm',(value) => ({
  payload: value,
}));

export const redirectToRoute = createAction<AppRoute>('film/redirectToNotFound');
