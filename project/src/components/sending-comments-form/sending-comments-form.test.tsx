import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import SendingCommentsForm from './sending-comments-form';
import thunk from 'redux-thunk';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { Routes, Route } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';

const film = makeFakeFilm();
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
});

const reviewSubmitedStore = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: true},
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
});

describe('Component: Sending comments form', () => {
  beforeEach(() => {
    history.push(AppRoute.AddReview);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <SendingCommentsForm />
        </HistoryRouter>
      </Provider>
    );

    const starElement = screen.getByText(/Rating 5/i);
    const reviewTextareaElement = screen.getByPlaceholderText(/Review text/i);
    expect(starElement).toBeInTheDocument();
    expect(reviewTextareaElement).toBeInTheDocument();
  });

  it('should dispatch addReviewAction when user typted correct data and click on "Post"', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history} >
          <SendingCommentsForm />
        </HistoryRouter>
      </Provider>
    );

    const starElement = screen.getByText(/Rating 5/i);
    const reviewTextareaElement = screen.getByPlaceholderText(/Review text/i);
    const sumbitElement = screen.getByText('Post');

    await userEvent.click(starElement);
    await userEvent.type(reviewTextareaElement, 'test test test test test test test test test test test');
    await userEvent.click(sumbitElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('addReview/addReview/pending');
  });

  it('should redirect to Movie Page and dispatch resetReviewStatus after user typted correct data and clicked on "Post"', async () => {

    render(
      <Provider store={reviewSubmitedStore}>
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
      </Provider>
    );

    const starElement = screen.getByText(/Rating 5/i);
    const reviewTextareaElement = screen.getByPlaceholderText(/Review text/i);
    const sumbitElement = screen.getByText('Post');

    await userEvent.click(starElement);
    await userEvent.type(reviewTextareaElement, 'test test test test test test test test test test test');
    await userEvent.click(sumbitElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('addReview/addReview/pending');
    expect(history.location.pathname).toBe(AppRoute.Film);
    expect(screen.getByText('Mock Movie Page Screen')).toBeInTheDocument();
  });
});
