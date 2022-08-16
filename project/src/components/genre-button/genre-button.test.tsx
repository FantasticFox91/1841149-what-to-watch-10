import { render, screen } from '@testing-library/react';
import GenreButton from './genre-button';

describe('Component: Genre button', () => {
  it('should render correctly', () => {

    render(
      <GenreButton genre={'Comedie'} isActive onClick={(e) => console.log(e)}/>
    );

    const liElement = screen.getByTestId('li');
    const buttonElement = screen.getByText('Comedie');

    expect(buttonElement).toBeInTheDocument();
    expect(liElement).toHaveClass('catalog__genres-item--active');
  });
});
