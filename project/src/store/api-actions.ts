import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Film } from '../types/films.js';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { addReviewData, errorReviewData, ReviewData } from '../types/review-data';
import { FavoriteData } from '../types/favourite-data';
import { setFilm } from './action';

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {extra: api }) => {
    await api.get(APIRoute.Login);
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, { extra: api }) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);

export const fetchFavouriteFilms = createAsyncThunk<Film[] | [], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/fetchFavoriteFilms',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film[] | []>(APIRoute.Favourite);
    return data;
  },
);

export const changeFavouriteFilmStatus = createAsyncThunk<Film, FavoriteData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'favorite/changeStatus',
  async ({filmId, filmStatus}, {dispatch, extra: api}) => {
    const { data } = await api.post<Film>(`${APIRoute.Favourite}/${filmId}/${Number(!filmStatus)}`);
    dispatch(setFilm(data));
    return data;
  },
);

export const fetchFilmsAction = createAsyncThunk<Film[], undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchFilms',
  async (_arg, { extra: api}) => {
    const { data } = await api.get<Film[]>(APIRoute.Films);
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchPromo',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Film>(APIRoute.Promo);
    return data;
  },
);

export const fetchFilm = createAsyncThunk<Film, string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilm',
  async (filmId, {extra: api }) => {
    const { data } = await api.get<Film>(`${APIRoute.Films}/${filmId}`);
    return data;
  },
);

export const fetchSimilarFilms = createAsyncThunk<Film[], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchSimilarFilm',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<Film[]>(`${AppRoute.MoviePage}${filmId}/similar`);
    const filteredData = data.filter((film) => film.id !== Number(filmId));
    return filteredData;
  },
);

export const fetchFilmComments = createAsyncThunk<ReviewData[] | [], string | undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'film/fetchFilmComments',
  async (filmId, { extra: api }) => {
    const { data } = await api.get<ReviewData[]>(`${APIRoute.Comments}/${filmId}`);
    return data;
  },
);

export const addReviewAction = createAsyncThunk<errorReviewData, [(string | undefined), addReviewData], {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'addReview/addReview',
  async ([filmID, {comment , rating}], { extra: api }) => {
    const { data } = await api.post<errorReviewData>(`${APIRoute.Comments}/${filmID}`, {comment, rating});
    return data;
  },
  );
