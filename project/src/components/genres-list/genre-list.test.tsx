import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE, TEST_INDEX } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import GenresList from './genres-list';
import userEvent from '@testing-library/user-event';

const film = makeFakeFilm();
const films = Array.from({length: 10}, () => makeFakeFilm());
const mockStore = configureMockStore();
const store = mockStore({
  FILMS: {films: films, isDataLoading: false},
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: Genre list', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <GenresList />
      </Provider>
    );

    expect(screen.getByText(films[TEST_INDEX].genre)).toBeInTheDocument();

  });

  it('should dispatch action when user click on Genre Button', async () => {

    render(
      <Provider store={store}>
        <GenresList />
      </Provider>
    );

    await userEvent.click(screen.getByText(films[0].genre));

    const actions = store.getActions();

    expect(actions[0].type).toBe('GENRE/showAnotherGenre');
  });
});
