import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading screen', () => {
  it('should render correctly', () => {

    render(
      <LoadingScreen />
    );

    const loadingContainerElement = screen.getByTestId('loading');
    expect(loadingContainerElement).toHaveClass('loading');
  });
});
