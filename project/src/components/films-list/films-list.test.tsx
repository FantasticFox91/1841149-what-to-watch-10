import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { makeFakeFilm } from '../../utils/mock';
import HistoryRouter from '../history-route';
import FilmsList from './films-list';

const films = Array.from({length: 10}, () => makeFakeFilm());
const history = createMemoryHistory();

describe('Component: Films list', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
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