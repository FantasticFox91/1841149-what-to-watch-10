import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MAX_ACTORS_IN_OVERVIEW } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import Overview from './overview';

const film = makeFakeFilm();
const mockStore = configureMockStore();
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [], similarFilms: [], isDataLoading: false},
});

describe('Component: Overview', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Overview />
      </Provider>
    );

    const ratingElement = screen.getByText(`${film.rating}`);
    const scoresCountElement = screen.getByText(`${film.scoresCount} ratings`);
    const filmDescriptionElement = screen.getByText(`${film.description}`);
    const directorElement = screen.getByText(`Director: ${film.director}`);
    const actorsElement = screen.getByText(`Starring: ${film.starring.slice(0, MAX_ACTORS_IN_OVERVIEW).join(', ')} and others`);

    expect(ratingElement).toBeInTheDocument();
    expect(scoresCountElement).toBeInTheDocument();
    expect(filmDescriptionElement).toBeInTheDocument();
    expect(directorElement).toBeInTheDocument();
    expect(actorsElement).toBeInTheDocument();
  });
});
