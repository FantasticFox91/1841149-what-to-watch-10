import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-route';
import MyListButtonNoAuth from './my-list-button-no-auth';

const history = createMemoryHistory();

describe('Component: My-list-button-no-auth', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <MyListButtonNoAuth />
      </HistoryRouter>,
    );

    const counterElement = screen.getByText('0');
    const textElement = screen.getByText('My list');

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('svg')).toBeInTheDocument();
    expect(counterElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });
});
