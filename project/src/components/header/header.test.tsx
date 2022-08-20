import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import HistoryRouter from '../history-route';
import Header from './header';
import { Routes, Route } from 'react-router-dom';
import MainScreen from '../../pages/main-screen/main-screen';
import userEvent from '@testing-library/user-event';
import { makeFakeFilm } from '../../utils/mock';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { redirectToRoot } from '../../store/action';

const film = makeFakeFilm();
const history = createMemoryHistory();
const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  FILMS: {films: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

const storeWithAuth = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  FILMS: {films: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
});

describe('Component: Header', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  describe('Header without authorization', () => {
    it('should render correctly in main screen', async () => {

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      const linkElement = screen.getByText(/Sign in/i);
      expect(linkElement).toBeInTheDocument();
    });

    it('should redirecti to login page when user click on "Sign-in"', async () => {

      render(
        <Provider store={store}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<MainScreen />}
              />
              <Route
                path={AppRoute.Login}
                element={<h1>Mock Login Screen</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );
      const linkElement = screen.getByText(/Sign in/i);
      await userEvent.click(linkElement);

      expect(screen.getByText(/Mock Login Screen/i)).toBeInTheDocument();
    });
  });

  describe('Header with authorization', () => {
    it('should render correctly in main screen', async () => {

      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );

      const avatarElement = screen.getByAltText('User avatar');
      const linkElement = screen.getByText(/Sign out/i);
      expect(linkElement).toBeInTheDocument();
      expect(avatarElement).toBeInTheDocument();
    });

    it('should redirect to My list page when user click on "Avatar"', async () => {

      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <Routes>
              <Route
                path={AppRoute.Root}
                element={<MainScreen />}
              />
              <Route
                path={AppRoute.MyList}
                element={<h1>Mock My list Screen</h1>}
              />
            </Routes>
          </HistoryRouter>
        </Provider>
      );
      const avatarElement = screen.getByAltText('User avatar');
      await userEvent.click(avatarElement);

      expect(screen.getByText(/Mock My list Screen/i)).toBeInTheDocument();
    });

    it('should invoke Logout action when user click on "Sign out"', async () => {

      render(
        <Provider store={storeWithAuth}>
          <HistoryRouter history={history}>
            <Header />
          </HistoryRouter>
        </Provider>
      );
      const linkElement = screen.getByTestId('signout');
      await userEvent.click(linkElement);

      const actions = storeWithAuth.getActions();
      expect(actions[3].type).toBe('user/logout/pending');
    });
  });
});
