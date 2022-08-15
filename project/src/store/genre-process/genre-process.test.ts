import { genreProcess, resetFilmsList, showAnotherGenre, showMoreFilms } from './genre-process';
import { GenreProcess } from '../../types/state';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';

describe('Reducer: genre', () => {
  let state: GenreProcess;

  beforeEach(() => {
    state = {genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP};
  });

  it('without additional parameters should return initial state', () => {
    expect(genreProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({genre: INITAL_FILMS_GENRE, renderedFilmCount: CARDS_PER_STEP});
  });

  it('Should change genre', () => {
    expect(genreProcess.reducer(state, showAnotherGenre('Comedie')))
      .toEqual({genre: 'Comedie', renderedFilmCount: CARDS_PER_STEP});
  });

  it('Should change films to show number', () => {
    expect(genreProcess.reducer(state, showMoreFilms(16)))
      .toEqual({genre: INITAL_FILMS_GENRE, renderedFilmCount: 16});
  });

  it('Should reset choosed genre and reser films to show number', () => {
    expect(genreProcess.reducer(state, resetFilmsList({genre: 'All genres', filmsToShow: CARDS_PER_STEP})))
      .toEqual({genre: 'All genres', renderedFilmCount: CARDS_PER_STEP});
  });
});
