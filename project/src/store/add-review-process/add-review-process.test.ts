import toastify from 'react-toastify';
import { AddReviewProcess } from '../../types/state';
import { addReviewAction } from '../api-actions';
import { addReviewProcess, resetReviewStatus } from './add-review-process';

describe('Reducer: addReviewProcess', () => {
  let state: AddReviewProcess;
  it('Without additional parameters should return initial state', () => {
    expect(addReviewProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isDataLoading: false, reviewSubmited: false});
  });

  describe('addReviewAction test', () => {
    it('Should set isDataLoading to true while waiting results from server', () => {
      expect(addReviewProcess.reducer(state, { type: addReviewAction.pending.type }))
        .toEqual({isDataLoading: true, reviewSubmited: false});
    });

    it('Should set isDataLoading to false and reviewSubmited to true if addReviewAction fullfiled', () => {
      expect(addReviewProcess.reducer(state, { type: addReviewAction.fulfilled.type }))
        .toEqual({isDataLoading: false, reviewSubmited: true});
    });

    it('Should set isDataLoading to false and reviewSubmited to false if addReviewAction rejected', () => {
      expect(addReviewProcess.reducer(state, { type: addReviewAction.rejected.type }))
        .toEqual({isDataLoading: false, reviewSubmited: false});
    });

    it('Should invoke toast if addReviewAction rejected', () => {
      const spy = jest.spyOn(toastify, 'toast');
      expect(addReviewProcess.reducer(state, { type: addReviewAction.rejected.type }))
        .toEqual({isDataLoading: false, reviewSubmited: false});
      expect(spy).toHaveBeenCalledWith('We can\'t send your awesome review, please try again later');
    });
  });

  it('Should reset review status to false', () => {
    expect(addReviewProcess.reducer(state, resetReviewStatus()))
      .toEqual({isDataLoading: false, reviewSubmited: false});
  });
});
