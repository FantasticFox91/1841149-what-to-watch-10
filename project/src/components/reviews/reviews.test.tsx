import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { makeFakeFilm, makeFakeFilmComment } from '../../utils/mock';
import Reviews from './reviews';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';

const film = makeFakeFilm();
const comment = makeFakeFilmComment();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FILM: {promoFilm: [], film: film, filmComments: [comment], similarFilms: [], isDataLoading: false},
});

describe('Component: Reviews', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <Reviews />
      </Provider>
    );

    const coomentTextElement = screen.getByText(`${comment.comment}`);

    expect(coomentTextElement).toBeInTheDocument();
  });
});
