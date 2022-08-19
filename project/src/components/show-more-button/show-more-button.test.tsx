import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import ShowMoreButton from './show-more-button';
import userEvent from '@testing-library/user-event';


const films = Array.from({length: 10}, () => makeFakeFilm());
const mockStore = configureMockStore();
const store = mockStore({
  GENRE: {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP},
});

describe('Component: Show more button', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <ShowMoreButton sortedFilms={films}/>
      </Provider>
    );

    const buttonElement = screen.getByText('Show more');
    expect(buttonElement).toBeInTheDocument();
  });

  it('should no render button if all films are shown', () => {

    render(
      <Provider store={store}>
        <ShowMoreButton sortedFilms={films.slice(0, 4)}/>
      </Provider>
    );

    expect(screen.queryByText('Show more')).not.toBeInTheDocument();
  });

  it('should dispatch showMoreFilms when user click on "Show more"', async () => {

    render(
      <Provider store={store}>
        <ShowMoreButton sortedFilms={films}/>
      </Provider>
    );

    const buttonElement = screen.getByText('Show more');
    await userEvent.click(buttonElement);
    const actions = store.getActions();
    expect(actions[0].type).toBe('GENRE/showMoreFilms');
  });


});
