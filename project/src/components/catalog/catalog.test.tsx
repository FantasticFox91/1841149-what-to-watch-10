import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import Catalog from './catalog';
import HistoryRouter from '../history-route';
import { createMemoryHistory } from 'history';

const film = makeFakeFilm();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const store = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
});

describe('Component: Catalog', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Catalog />
        </HistoryRouter>,
      </Provider>
    );

    const textElement = screen.getByText(/Catalog/i);
    expect(textElement).toBeInTheDocument();
  });
});
