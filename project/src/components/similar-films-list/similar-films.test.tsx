import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import SimilarFilmsList from './similar-films-list';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';

const film = makeFakeFilm();
const films = Array.from({length: 4}, () => makeFakeFilm());
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: films, isDataLoading: false},
});

const noSimilarStore = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
});

describe('Component: Similar films', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SimilarFilmsList />
        </HistoryRouter>
      </Provider>
    );

    const filmHeaderElement = screen.getByText(`${films[2].name}`);
    expect(filmHeaderElement).toBeInTheDocument();
  });

  it('should render without similarFilms correctly', () => {

    render(
      <Provider store={noSimilarStore}>
        <HistoryRouter history={history}>
          <SimilarFilmsList />
        </HistoryRouter>
      </Provider>
    );

    const textElement = screen.getByText(/We are sory but we can't find siimilar films in out database/i);
    expect(textElement).toBeInTheDocument();
  });
});
