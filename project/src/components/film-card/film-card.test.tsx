import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus, CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-router';
import { Routes, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FilmCard from './film-card';
import MainScreen from '../../pages/main-screen/main-screen';

const history = createMemoryHistory();
const film = makeFakeFilm();
const mockStore = configureMockStore();
const store = mockStore({
  FILMS: {films: [film], isDataLoading: false},
  FILM: {promoFilm: film, film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
  ADD_REVIEW: {isDataLoading: false, reviewSubmited: false},
  FAVORITE: { favoriteFilms: [film], isDataLoading: false},
});

describe('Component: Film Card', () => {
  beforeEach(() => {
    history.push(AppRoute.Root);
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCard id={film.id} previewImage={film.previewImage} name={film.name}/>
        </HistoryRouter>
      </Provider>,
    );

    const headerElement = screen.getByText(film.name);
    const imgElement = screen.getByAltText(film.name);

    expect(headerElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });

  it('when user click on "Film card" should redirect', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<MainScreen />}
            />
            <Route
              path={AppRoute.Film}
              element={<h1>Mock Film Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    await userEvent.click(screen.getByTitle(`/films/${film.id}`));

    expect(screen.getByText(/Mock Film Screen/i)).toBeInTheDocument();
  });
});
