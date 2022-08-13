import { filmsProcess } from './films-process';
import { FilmsProcess } from '../../types/state';
import { fetchFilmsAction } from '../api-actions';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../services/api';

jest.mock('react-toastify');
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

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
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.fulfilled.type, payload: films}))
        .toEqual({films, isDataLoading: false});
    });

    it('should invoke toast if fetchFilmAction rejected', () => {
      expect(filmsProcess.reducer(state, { type: fetchFilmsAction.rejected.type }))
        .toEqual({films: [], isDataLoading: false});
      const message = 'test';
      mockAxios.get.mockRejectedValueOnce(toast.warn(message));
      expect(toast.warn).toHaveBeenCalledWith(message);
    });
  });
});
