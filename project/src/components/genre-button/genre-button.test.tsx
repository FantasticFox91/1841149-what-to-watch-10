import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GenreButton from './genre-button';

describe('Component: Genre button', () => {
  it('should render correctly', () => {

    render(
      <GenreButton genre={'Comedie'} isActive onClick={jest.fn()}/>
    );

    const liElement = screen.getByTestId('li');
    const buttonElement = screen.getByText('Comedie');

    expect(buttonElement).toBeInTheDocument();
    expect(liElement).toHaveClass('catalog__genres-item--active');
  });

  it('should render correctly if "Genre Button" not active', () => {

    render(
      <GenreButton genre={'Comedie'} isActive={false} onClick={jest.fn()}/>
    );

    const liElement = screen.getByTestId('li');
    const buttonElement = screen.getByText('Comedie');

    expect(buttonElement).toBeInTheDocument();
    expect(liElement).not.toHaveClass('catalog__genres-item--active');
  });

  it('should invoke function when user click on "Genre Button"', async () => {
    const genreButtonClickHandle = jest.fn();

    render(
      <GenreButton genre={'Comedie'} isActive onClick={genreButtonClickHandle}/>
    );

    await userEvent.click(screen.getByTestId('li'));

    expect(genreButtonClickHandle).toBeCalled();
  });
});
