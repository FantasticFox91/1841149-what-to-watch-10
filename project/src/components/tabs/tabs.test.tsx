import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeFilm, makeFakeFilmComment } from '../../utils/mock';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import Tabs from './tabs';
import userEvent from '@testing-library/user-event';
import { MAX_ACTORS_IN_OVERVIEW } from '../../const';

const film = makeFakeFilm();
const comment = makeFakeFilmComment();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [comment], similarFilms: [], isDataLoading: false},
});

describe('Component: Tabs', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    const overviewElement = screen.getByText(/Overview/i);
    const detailsElement = screen.getByText(/Details/i);
    const reviewsElement = screen.getByText(/Reviews/i);

    expect(overviewElement).toBeInTheDocument();
    expect(detailsElement).toBeInTheDocument();
    expect(reviewsElement).toBeInTheDocument();
  });

  it('should invoke function when user click on "Overview" tab', async () => {
    const tabClickHandle = jest.fn();
    const activeTab = 'Overview';

    render(
      <Provider store={store}>
        <nav className="film-nav film-card__nav">
          <ul className="film-nav__list">
            <li
              className={activeTab === 'Overview' ? 'film-nav__item film-nav__item--active' : 'film-nav__item'}
            >
              <button className="film-nav__link" onClick={tabClickHandle}>Overview</button>
            </li>
          </ul>
        </nav>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Overview/i));

    expect(tabClickHandle).toBeCalled();
  });

  it('should show film overview when user click on "Overview" tab', async () => {

    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Overview/i));

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

  it('should show film details when user click on "Details" tab', async () => {

    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Details/i));

    const genreTextElement = screen.getByText(/Genre/i);
    expect(genreTextElement).toBeInTheDocument();
  });

  it('should show film Reviews when user click on "Reviews" tab', async () => {

    render(
      <Provider store={store}>
        <Tabs />
      </Provider>
    );

    await userEvent.click(screen.getByText(/Reviews/i));

    const commentTextElement = screen.getByText(`${comment.comment}`);
    expect(commentTextElement).toBeInTheDocument();
  });

});
