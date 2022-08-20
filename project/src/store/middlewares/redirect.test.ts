import { configureMockStore } from '@jedmao/redux-mock-store';
import { AnyAction } from 'redux';
import { redirect } from './redirect';
import { AppRoute } from '../../const';
import { State } from '../../types/state';
import { redirectToRoot } from '../action';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /servererror', () => {
    store.dispatch(redirectToRoot(AppRoute.ServerError));
    expect(fakeHistory.location.pathname).toBe(AppRoute.ServerError);
    expect(store.getActions()).toEqual([
      redirectToRoot(AppRoute.ServerError),
    ]);
  });
});
