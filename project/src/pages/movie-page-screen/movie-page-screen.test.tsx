import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeFilm } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import HistoryRouter from '../../components/history-route';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import MoviePageScreen from './movie-page-screen';

const history = createMemoryHistory();
const film = makeFakeFilm();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

const authStore = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

const noFilmStore = mockStore({
  FILMS: {films: [], isDataLoading: false},
  FILM: {promoFilm: [], film: null, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: Movie page screen', () => {
  beforeEach(() => {
    history.push(AppRoute.MoviePage);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByText(`${film.name}`);
    const filmGenreElement = screen.getByText(`${film.genre}`);
    expect(headerElement).toBeInTheDocument();
    expect(filmGenreElement).toBeInTheDocument();
  });

  it('should render Page not found when can\t find film', () => {

    render(
      <Provider store={noFilmStore}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>
    );

    const textElement = screen.getByText(/Page not found/i);
    expect(textElement).toBeInTheDocument();
  });

  it('should redirect to Player if user clicked on play button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.MoviePage}
              element={<MoviePageScreen />}
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

  it('should render My List Button No Auth if user not authorized', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>
    );

    const myListButtonElement = screen.getByTestId('myListLink');
    expect(myListButtonElement).toBeInTheDocument();
  });

  it('should render My List Button if user authorized', () => {

    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <MoviePageScreen />
        </HistoryRouter>
      </Provider>
    );

    const myListButtonElement = screen.getByText('My list');
    expect(myListButtonElement).toBeInTheDocument();
  });
});
