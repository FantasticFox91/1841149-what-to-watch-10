import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { addReviewAction, changeFavouriteFilmStatus, checkAuthAction, fetchFavouriteFilms, fetchFilm, fetchFilmComments, fetchFilmsAction, fetchPromoAction, fetchSimilarFilms, loginAction, logoutAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeFilm, makeFakeFilmComment } from '../utils/mock';
import { setFilm } from './action';

const film = makeFakeFilm();
const comment = makeFakeFilmComment();

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('Should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('Should dispatch RequriedAuthorization when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.com', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', 'secret');
  });

  it('Should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });

  it('Should dispatch fetchFavoriteFilms when GET /favorite', async () => {
    const films = [film];
    mockAPI
      .onGet(APIRoute.Favourite)
      .reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFavouriteFilms());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavouriteFilms.pending.type,
      fetchFavouriteFilms.fulfilled.type
    ]);
  });
  /*
  it('Should dispatch changeFavouriteFilmStatus when GET /favorite/filmId/filmStatus', async () => {
    mockAPI
      .onPost(`${APIRoute.Favourite}/${film.id}/0`)
      .reply(200, {...film, isFavorite: false});

    const store = mockStore();

    await store.dispatch(changeFavouriteFilmStatus({filmId: String(film.id), filmStatus: !film.isFavorite}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavouriteFilmStatus.pending.type,
      changeFavouriteFilmStatus.fulfilled.type,
    ]);
    // тут еще должна быть проверка выполнения функции setFilm
  });
  */

  it('Should dispatch fetchFilmsAction when GET /films', async () => {
    const films = [film];
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, films);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });
/*
  it('Should dispatch fetchSimilarFilmsAction when GET /films/filmID/similar', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${film.id}/similar`)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilms(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilms.pending.type,
      fetchSimilarFilms.fulfilled.type
    ]);
  });
*/
  it('Should dispatch fetchPromoFilm when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('Should dispatch fetchFilm when GET /film', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${String(film.id)}`)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchFilm(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilm.pending.type,
      fetchFilm.fulfilled.type
    ]);
  });

  it('Should dispatch fetchFilmComments when GET /comments/filmID', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${film.id}`)
      .reply(200, comment);

    const store = mockStore();

    await store.dispatch(fetchFilmComments(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmComments.pending.type,
      fetchFilmComments.fulfilled.type
    ]);
  });

  it('Should dispatch addReviewActionAction when POST /comments/filmID', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${film.id}`)
      .reply(200, comment);

    const store = mockStore();

    await store.dispatch(addReviewAction([String(film.id), {comment: comment.comment, rating: comment.rating}]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);
  });
});
