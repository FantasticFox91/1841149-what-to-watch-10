import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import AddReviewButton from './add-review-button';
import { Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import MoviePageScreen from '../../pages/movie-page-screen/movie-page-screen';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const history = createMemoryHistory();
const film = makeFakeFilm();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
});

describe('Component: AddReviewButton', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Film}${film.id}`);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReviewButton id={film.id}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('when user click "Add Review Button" should redirect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Film}
              element={<MoviePageScreen />}
            />
            <Route
              path={AppRoute.AddReview}
              element={<h1>Mock Add Review Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(/Add review/i));

    expect(screen.getByText(/Mock Add Review Screen/i)).toBeInTheDocument();
  });
});
