import { store } from '../store/index.js';
import { AuthorizationStatus, GENRE_TABS } from '../const';
import { Film } from './films.js';
import { errorReviewData, ReviewData } from '../types/review-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus
  error: errorReviewData | null | unknown;
};

export type FilmsProcess = {
  films: Film[] | [];
  isDataLoading: boolean;
};

export type FilmProcess = {
  film: Film | null;
  filmComments: ReviewData[] | [];
  similarFilms: Film[] | [];
  isDataLoading: boolean;
};

export type GenreProcess = {
  genre: GENRE_TABS;
  renderedFilmCount: number;
};

export type AddReviewProcess = {
  isDataLoading: boolean;
};

export type PromoFilmProcess = {
  promoFilm: Film | null;
  isDataLoading: boolean;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
