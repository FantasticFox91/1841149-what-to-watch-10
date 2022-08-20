import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route';
import Logo from './logo';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import { makeFakeFilm } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { redirectToRoot } from '../../store/action';

const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
const middlewares = [thunk.withExtraArgument(api)];
const film = makeFakeFilm();
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
});

describe('Component: Logo', () => {
  beforeEach(() => {
    history.push(`/films/${film.id}`);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Logo isInFooter/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveClass('logo__link logo__link--light');
  });

  it('when user click "Logo" should redirect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Film}
              element={<MoviePageScreen />}
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Mock Main Page Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getAllByRole('link')[0]);

    expect(screen.getByText(/Mock Main Page Screen/i)).toBeInTheDocument();
  });
});
