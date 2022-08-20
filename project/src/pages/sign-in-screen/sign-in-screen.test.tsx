import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router';
import { AuthorizationStatus } from '../../const';
import SignInScreen from './sign-in-screen';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const fakeStore = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
});

describe('Component: Sign in screen', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <SignInScreen />
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getAllByText(/Sign in/i)[0];
    const emailInputElement = screen.getByPlaceholderText(/Email address/i);
    const passwordInputElement = screen.getByPlaceholderText(/Password/i);
    expect(headerElement).toBeInTheDocument();
    expect(emailInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });
});
