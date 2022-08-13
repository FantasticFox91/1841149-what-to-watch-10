import { addReviewProcess, resetReviewStatus } from './add-review-process';

describe('Reducer: addReviewProcess', () => {
  it('without additional parameters should return initial state', () => {
    expect(addReviewProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({isDataLoading: false, reviewSubmited: false});
  });
});
