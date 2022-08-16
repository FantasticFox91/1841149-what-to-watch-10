import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';

describe('Component: Error message', () => {
  it('should render correctly', () => {

    render(
      <ErrorMessage />
    );

    const textElement = screen.getByText('Please enter a valid email address');

    expect(textElement).toBeInTheDocument();
  });
});
