import { favoriteProcess } from './favorite-process';
import { FavoriteFilmsProcess } from '../../types/state';
import { changeFavouriteFilmStatus, fetchFavouriteFilms } from '../api-actions';

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

    it('should set isDataLoading to false and set favorite films if fetchFilmsAction fulfilled', () => {
      expect(favoriteProcess.reducer(state, { type: fetchFavouriteFilms.fulfilled.type }))
        .toEqual({favoriteFilms: [], isDataLoading: false});
    });
  });
});
