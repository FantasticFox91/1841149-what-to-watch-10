import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
import { Film } from '../types/films.js';
import { loadFilms, loadPromo, requireAuthorization, setDataLoadedStatus, loadFilm, loadSimilarFilms, setError, loadFilmComments } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import {store} from './';
import { addReviewData, ReviewData } from '../types/review-data.js';

export const clearErrorAction = createAsyncThunk(
  'user/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      TIMEOUT_SHOW_ERROR,
    );
  },
);

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(APIRoute.Films);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadFilms(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchPromoAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    dispatch(setDataLoadedStatus(true));
    dispatch(loadPromo(data));
    dispatch(setDataLoadedStatus(false));
  },
);

export const fetchFilm = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilm',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${AppRoute.MoviePage}${filmId}`);
    dispatch(loadFilm(data));
  },
);

export const fetchSimilarFilms = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilm',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<Film[]>(`${AppRoute.MoviePage}${filmId}/similar`);
    const filteredData = data.filter((film) => film.id !== Number(filmId));
    dispatch(loadSimilarFilms(filteredData));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (e){
      setError(e);
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);

export const fetchFilmComments = createAsyncThunk<void, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilm',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewData[]>(`${APIRoute.Comments}/${filmId}`);
    dispatch(loadFilmComments(data));
  },
);

export const addReviewAction = createAsyncThunk<void, [(string | undefined),addReviewData], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/addReview',
  async ([filmID, {comment , rating}], {dispatch, extra: api}) => {
    try {
      const { data } = await api.post<ReviewData>(`${APIRoute.Comments}/${filmID}`, {comment, rating});
    } catch (e){
      setError(e);
    }
  },
);
