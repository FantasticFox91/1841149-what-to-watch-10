import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import FilmCard from './film-card';

describe('Component: Film Card', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const film = makeFakeFilm();

    render(
      <HistoryRouter history={history}>
        <FilmCard id={film.id} previewImage={film.previewImage} name={film.name}/>
      </HistoryRouter>,
    );

    const headerElement = screen.getByText(film.name);
    const imgElement = screen.getByAltText(film.name);

    expect(headerElement).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
  });
});
