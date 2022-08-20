import { render, screen } from '@testing-library/react';
import ServerErrorScreen from './server-error-screen';

describe('Component: Server error screen', () => {
  it('should render correctly', () => {

    render(
      <ServerErrorScreen />
    );

    const headerElement = screen.getByText(/Something wrong with server/i);
    expect(headerElement).toBeInTheDocument();
  });
});
