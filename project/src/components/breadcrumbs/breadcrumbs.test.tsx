import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import Breadcrumbs from './breadcrumbs';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const film = makeFakeFilm();
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
});

describe('Component: Breadcrumbs', () => {
  beforeEach(() => {
    history.push(`/films/${film.id}/review`);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Breadcrumbs />
        </HistoryRouter>
      </Provider>
    );

    const linkElement = screen.getByText(film.name);
    const textElement = screen.getByText(/Add review/i);
    expect(linkElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it('when user click "Film name link" should redirect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.AddReview}
              element={<AddReviewScreen />}
            />
            <Route
              path={AppRoute.Film}
              element={<h1>Mock Movie Page Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByText(film.name));

    expect(screen.getByText(/Mock Movie Page Screen/i)).toBeInTheDocument();
  });
});
