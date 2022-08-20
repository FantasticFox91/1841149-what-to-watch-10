import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router';
import { AuthorizationStatus, AppRoute, CARDS_PER_STEP, INITAL_FILMS_GENRE, TEST_INDEX } from '../../const';
import App from './app';
import { makeFakeFilm } from '../../utils/mock';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { redirectToRoot } from '../../store/action';

const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const promoFilm = makeFakeFilm();
const films = Array.from({length: 10}, () => makeFakeFilm());

const store = mockStore({
  FILMS: {films: films, isDataLoading: false},
  FILM: {promoFilm: promoFilm, film: promoFilm, filmComments: [], similarFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
  FAVORITE: { favoriteFilms: [promoFilm], isDataLoading: false},
});

const authStore = mockStore({
  FILMS: {films: films, isDataLoading: false},
  FILM: {promoFilm: promoFilm, film: promoFilm, filmComments: [], similarFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
  FAVORITE: { favoriteFilms: [promoFilm], isDataLoading: false},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const authFakeApp = (
  <Provider store={authStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);


describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render "Main screen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(`${promoFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${films[TEST_INDEX].name}`)).toBeInTheDocument();
    expect(screen.getByText('Show more')).toBeInTheDocument();
  });

  it('should render "Sign-in screen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByPlaceholderText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should render "My list" when user navigate to "/MyList"', () => {
    history.push(AppRoute.MyList);

    render(authFakeApp);

    expect(screen.getByText(`${promoFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Film screen" when user navigate to "/films/filmID"', () => {
    history.push(AppRoute.Film);

    render(fakeApp);

    expect(screen.getByText(`${promoFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${promoFilm.description}`)).toBeInTheDocument();
    expect(screen.getByText(`${promoFilm.rating}`)).toBeInTheDocument();
  });

  it('should render "Player screen" when user navigate to "/films/filmID"', () => {
    history.push(`${AppRoute.Player}`);

    render(fakeApp);

    expect(screen.getByText(`${promoFilm.name}`)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
  });

  it('should render "Add review screen" when user navigate to "/films/filmID"', () => {
    history.push(AppRoute.AddReview);

    render(authFakeApp);

    expect(screen.getByText(`${promoFilm.name}`)).toBeInTheDocument();
  });

  it('should render "Page not found screen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go to main page')).toBeInTheDocument();
  });
});
