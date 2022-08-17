import { filmsProcess } from './films-process';
import { FilmsProcess } from '../../types/state';
import { fetchFilmsAction } from '../api-actions';
import toastify from 'react-toastify';
import { makeFakeFilm } from '../../utils/mock';

const film = makeFakeFilm();

describe('Reducer: films', () => {
  let state: FilmsProcess;

  beforeEach(() => {
    state = {films: [], isDataLoading: false};
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({films: [], isDataLoading: false});
  });

  describe('fetchFilmsAction test', () => {
    it('should set isDataLoading to true while waiting the result', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.pending.type }))
        .toEqual({films: [], isDataLoading: true});
    });

    it('should set isDataLoading to false if fetchFilmsAction rejected', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.rejected.type }))
        .toEqual({films: [], isDataLoading: false});
    });

    it('should set isDataLoading to false and set Films if fetchFilmsAction fulfilled', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: film}))
        .toEqual({films: film, isDataLoading: false});
    });

    it('should invoke toast if fetchFilmAction rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.rejected.type}))
        .toEqual({films: [], isDataLoading: false});
      expect(spy).toHaveBeenCalledWith('Opsie.....something get wrong, can\'t find films. Please try again later.');
    });
  });
});
