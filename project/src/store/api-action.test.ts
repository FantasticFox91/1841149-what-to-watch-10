import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { addReviewAction, changeFavouriteFilmStatus, checkAuthAction, fetchFavouriteFilms, fetchFilm, fetchFilmComments, fetchFilmsAction, fetchPromoAction, fetchSimilarFilms, loginAction, logoutAction } from './api-actions';
import { APIRoute, AppRoute } from '../const';
import { State } from '../types/state';
import { AuthData } from '../types/auth-data';
import { makeFakeFilm, makeFakeFilmComment } from '../utils/mock';
import { redirectToRoot, setFilm } from './action';
import { store } from '.';

const film = makeFakeFilm();
const comment = makeFakeFilmComment();

describe('Async actions', () => {
  const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
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

  it('Should authorization status is «noauth» when server return 401', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(401, {error: 'You are not logged in or you do not have permission to this page.'});

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type
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

  it('Should rejecte Login if login with error', async () => {
    const fakeUser: AuthData = {login: 'test@test', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(400, {});

    const store = mockStore();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type
    ]);
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

  it('Should reject Logout when Delete /logout with error', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(400);

    const store = mockStore();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.rejected.type
    ]);
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

  it('Should reject fetchFavoriteFilms when GET /favorite with error', async () => {
    mockAPI
      .onGet(APIRoute.Favourite)
      .reply(401, {error: 'You are not logged in or you do not have permission to this page.'});

    const store = mockStore();

    await store.dispatch(fetchFavouriteFilms());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavouriteFilms.pending.type,
      fetchFavouriteFilms.rejected.type
    ]);
  });

  it('Should dispatch changeFavouriteFilmStatus when POST /favorite/filmId/filmStatus', async () => {
    mockAPI
      .onPost(`${APIRoute.Favourite}/${film.id}/${Number(!film.isFavorite)}`)
      .reply(200, {...film, isFavorite: !film.isFavorite});

    const store = mockStore();

    await store.dispatch(changeFavouriteFilmStatus({filmId: String(film.id), filmStatus: film.isFavorite}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavouriteFilmStatus.pending.type,
      setFilm.type,
      changeFavouriteFilmStatus.fulfilled.type,
    ]);
  });

  it('Should reject changeFavouriteFilmStatus when POST /favorite/filmId/filmStatus with error', async () => {
    mockAPI
      .onPost(`${APIRoute.Favourite}/${film.id}/${Number(!film.isFavorite)}`)
      .reply(401, {error: 'You are not logged in or you do not have permission to this page.'});

    const store = mockStore();

    await store.dispatch(changeFavouriteFilmStatus({filmId: String(film.id), filmStatus: film.isFavorite}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavouriteFilmStatus.pending.type,
      changeFavouriteFilmStatus.rejected.type
    ]);
  });

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

  it('Should dispatch fetchSimilarFilmsAction when GET /films/filmID/similar', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${film.id}/similar`)
      .reply(200, [film]);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilms(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilms.pending.type,
      fetchSimilarFilms.fulfilled.type
    ]);
  });

  it('Should reject fetchSimilarFilmsAction when GET /films/filmID/similar with error', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${film.id}/similar`)
      .reply(404);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilms(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilms.pending.type,
      fetchSimilarFilms.rejected.type
    ]);
  });

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
      .onGet(`${APIRoute.Films}/${film.id}`)
      .reply(200, film);

    const store = mockStore();

    await store.dispatch(fetchFilm(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilm.pending.type,
      fetchFilm.fulfilled.type
    ]);
  });

  it('Should reject fetchFilm when GET /film with error', async () => {
    mockAPI
      .onGet(`${APIRoute.Films}/${film.id}`)
      .reply(404);

    const store = mockStore();

    await store.dispatch(fetchFilm(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilm.pending.type,
      fetchFilm.rejected.type
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

  it('Should reject fetchFilmComments when GET /comments/filmID', async () => {
    mockAPI
      .onGet(`${APIRoute.Comments}/${film.id}`)
      .reply(400, {'error': `Film id ${film.id} does not exist`});

    const store = mockStore();

    await store.dispatch(fetchFilmComments(String(film.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmComments.pending.type,
      fetchFilmComments.rejected.type
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

  it('Should reject addReviewActionAction when POST /comments/filmID when can\t fint film', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${film.id}`)
      .reply(400, {'error': `Film id ${film.id} does not exist`});

    const store = mockStore();

    await store.dispatch(addReviewAction([String(film.id), {comment: comment.comment, rating: comment.rating}]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.rejected.type
    ]);
  });

  it('Should reject addReviewActionAction when POST /comments/filmID with error', async () => {
    mockAPI
      .onPost(`${APIRoute.Comments}/${film.id}`)
      .reply(401, {'error': 'You are not logged in or you do not have permission to this page.'});

    const store = mockStore();

    await store.dispatch(addReviewAction([String(film.id), {comment: comment.comment, rating: comment.rating}]));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.rejected.type
    ]);
  });
});
