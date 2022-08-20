import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router';
import MyListButtonNoAuth from './my-list-button-no-auth';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import MainScreen from '../../pages/main-screen/main-screen';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  FILMS: {films: [], isDataLoading: false},
  FILM: {promoFilm: [], film: [], filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: My-list-button-no-auth', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyListButtonNoAuth />
        </HistoryRouter>
      </Provider>
    );

    const counterElement = screen.getByText('0');
    const textElement = screen.getByText('My list');

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('svg')).toBeInTheDocument();
    expect(counterElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('when user click "My List Button No Auth" should redirect', async () => {
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

    await userEvent.click(screen.getByText(/My list/i));

    expect(screen.getByText(/Mock Login Screen/i)).toBeInTheDocument();
  });
});
