import { render, screen } from '@testing-library/react';
import { makeFakeFilm } from '../../utils/mock';
import DetailsStar from './details-star';

const film = makeFakeFilm();

describe('Component: Detail star', () => {
  it('should render correctly', () => {

    render(
      <DetailsStar star={film.starring[0]}/>
    );

    const textElement = screen.getByText(film.starring[0]);
    expect(textElement).toBeInTheDocument();
  });
});
