import { store } from '../store/index.js';
import { AuthorizationStatus } from '../const';
import { Film } from './films.js';
import { ReviewData } from '../types/review-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  error: boolean | null | unknown;
};

export type FilmsProcess = {
  films: Film[] | [];
  isDataLoading: boolean;
};

export type FilmProcess = {
  promoFilm: Film | null;
  film: Film | null;
  filmComments: ReviewData[] | [];
  similarFilms: Film[] | [];
  isDataLoading: boolean;
};

export type GenreProcess = {
  genre: string;
  renderedFilmCount: number;
};

export type AddReviewProcess = {
  isDataLoading: boolean;
  reviewSubmited: boolean;
};

export type FavoriteFilmsProcess = {
  favoriteFilms: Film[] | [];
  isDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
