import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { addReviewProcess } from './add-review-process/add-review-process';
import { favoriteProcess } from './favorite-process/favorite-process';
import { filmProcess } from './film-process/film-process';
import { filmsProcess } from './films-process/films-process';
import { genreProcess } from './genre-process/genre-process';
import { userProcess } from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Films]: filmsProcess.reducer,
  [NameSpace.Film]: filmProcess.reducer,
  [NameSpace.Genre]: genreProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.AddReview]: addReviewProcess.reducer,
  [NameSpace.Favorite]: favoriteProcess.reducer,
});
