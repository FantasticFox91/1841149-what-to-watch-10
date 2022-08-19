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
import PlayerScreen from './player-screen';

const history = createMemoryHistory();
const film = makeFakeFilm();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: Player screen', () => {
  beforeEach(() => {
    history.push(AppRoute.Player);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <PlayerScreen />
        </HistoryRouter>
      </Provider>
    );

    const playButtonElement = screen.getByText('Play');
    const exitButtonElement = screen.getByText('Exit');
    const fullScreenButtonElement = screen.getByText('Full screen');
    expect(playButtonElement).toBeInTheDocument();
    expect(exitButtonElement).toBeInTheDocument();
    expect(fullScreenButtonElement).toBeInTheDocument();
  });

  it('should redirect to Movie Page if user clicked on exit button', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Player}
              element={<PlayerScreen />}
            />
            <Route
              path={`/films/${film?.id}`}
              element={<h1>Mock Movie Page Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    const exitButtonElement = screen.getByText('Exit');
    await userEvent.click(exitButtonElement);

    expect(history.location.pathname).toBe(`/films/${film?.id}`);
    expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();
  });
});
