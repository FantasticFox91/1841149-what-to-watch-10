import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import FilmsList from './films-list';

const films = Array.from({length: 10}, () => makeFakeFilm());
const history = createMemoryHistory();

describe('Component: Films list', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history} >
        <FilmsList films={films}/>
      </HistoryRouter>
    );

    const headerElement = screen.getByText(films[4].name);
    expect(headerElement).toBeInTheDocument();
  });
});
