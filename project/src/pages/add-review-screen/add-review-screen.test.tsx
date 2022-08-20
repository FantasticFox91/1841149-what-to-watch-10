import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import AddReviewScreen from './add-review-screen';

const history = createMemoryHistory();
const film = makeFakeFilm();
const mockStore = configureMockStore();
const fakeStore = mockStore({
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
});

describe('Component: Add review screen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <AddReviewScreen />
        </HistoryRouter>
      </Provider>
    );

    const textareaElement = screen.getByPlaceholderText(/Review text/i);
    expect(textareaElement).toBeInTheDocument();
  });
});
