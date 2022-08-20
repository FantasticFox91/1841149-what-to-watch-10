import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import MainScreen from './main-screen';
import { Provider } from 'react-redux';
import { makeFakeFilm } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { redirectToRoot } from '../../store/action';

const history = createMemoryHistory();
const film = makeFakeFilm();
const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

const dataLoadingStore = mockStore({
  FILMS: {films: [film], isDataLoading: true},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: true},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: true},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

const authStore = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: Main screen', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    const playButtonElement = screen.getByText('Play');
    expect(playButtonElement).toBeInTheDocument();
  });

  it('should redirect to Player if user clicked on play button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<MainScreen />}
            />
            <Route
              path={`/player/${film.id}`}
              element={<h1>Mock Player Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const playButtonElement = screen.getByText('Play');
    await userEvent.click(playButtonElement);

    expect(history.location.pathname).toBe(`/player/${film.id}`);
    expect(screen.getByText(/Mock Player Screen/i)).toBeInTheDocument();
  });

  it('should render Loading screen while fetching data', () => {

    render(
      <Provider store={dataLoadingStore}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    const loadingContainerElement = screen.getByTestId('loading');
    expect(loadingContainerElement).toHaveClass('loading');
  });

  it('should render My List Button No Auth if user not authorized', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    const myListButtonElement = screen.getByTestId('myListLink');
    expect(myListButtonElement).toBeInTheDocument();
  });

  it('should not render My List Button if user not authorized', () => {

    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    const myListButtonElement = screen.getByText('My list');
    expect(myListButtonElement).toBeInTheDocument();
  });
});
