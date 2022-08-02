import { createAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../const';
import { Film } from '../types/films';

export const showAnotherGenre = createAction('films/showAnotherGenre', (value) => ({
  payload: value,
}));

export const showMoreFilms = createAction('films/showMoreFilms', (value) => ({
  payload: value,
}));

export const resetFilmsList = createAction('films/resetFilmsList', (value) => ({
  payload: value,
}));

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const loadFilms = createAction<Film[]>('data/loadFilms');

export const loadFilm = createAction('data/loadFilm', (value) => ({
  payload: value,
}));

export const loadSimilarFilms = createAction('data/loadSimilarFilms', (value) => ({
  payload: value,
}));

export const loadPromo = createAction<Film>('data/loadPromo');

export const setError = createAction<string | null>('user/setError');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
