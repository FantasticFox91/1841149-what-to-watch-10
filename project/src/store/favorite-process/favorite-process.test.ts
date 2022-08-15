import { favoriteProcess } from './favorite-process';
import { FavoriteFilmsProcess } from '../../types/state';
import { changeFavouriteFilmStatus, fetchFavouriteFilms } from '../api-actions';
import { makeFakeFilm } from '../../utils/mock';
import toastify from 'react-toastify';

const film = makeFakeFilm();

describe('Reducer: favorite', () => {
  let state: FavoriteFilmsProcess;

  beforeEach(() => {
    state = {favoriteFilms: [], isDataLoading: false};
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({favoriteFilms: [], isDataLoading: false});
  });

  describe('fetchFavoriteFilms test', () => {
    it('should set isDataLoading to true while waiting the result', () => {
      expect(favoriteProcess.reducer(state, { type: fetchFavouriteFilms.pending.type }))
        .toEqual({favoriteFilms: [], isDataLoading: true});
    });

    it('should set isDataLoading to false if fetchFavoriteFilms rejected', () => {
      expect(favoriteProcess.reducer(state, { type: fetchFavouriteFilms.rejected.type }))
        .toEqual({favoriteFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if fetchFavoriteFilms rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(favoriteProcess.reducer(state, { type: fetchFavouriteFilms.rejected.type }))
        .toEqual({favoriteFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find your favorite. Please try again later.');
    });

    it('should set isDataLoading to false and set favorite films if fetchFilmsAction fulfilled', () => {
      expect(favoriteProcess.reducer(state, { type: fetchFavouriteFilms.fulfilled.type, payload: film }))
        .toEqual({favoriteFilms: film, isDataLoading: false});
    });
  });

  describe('changeFavouriteFilmStatus test', () => {
    it('should set isDataLoading to true while waiting the result', () => {
      expect(favoriteProcess.reducer(state, { type: changeFavouriteFilmStatus.pending.type }))
        .toEqual({favoriteFilms: [], isDataLoading: true});
    });

    it('should set isDataLoading to false if changeFavoriteFilmStatus rejected', () => {
      expect(favoriteProcess.reducer(state, { type: changeFavouriteFilmStatus.rejected.type }))
        .toEqual({favoriteFilms: [], isDataLoading: false});
    });

    it('Should invoke toast if changeFavoriteFilmStatus rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(favoriteProcess.reducer(state, { type: changeFavouriteFilmStatus.rejected.type }))
        .toEqual({favoriteFilms: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t update movie. Please try again later.');
    });

    it('should set isDataLoading to false if changeFavoriteFilmStatus fulfilled', () => {
      expect(favoriteProcess.reducer(state, { type: changeFavouriteFilmStatus.fulfilled.type}))
        .toEqual({favoriteFilms: [], isDataLoading: false});
    });
  });
});
