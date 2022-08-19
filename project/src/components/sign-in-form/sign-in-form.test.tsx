import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const';
import userEvent from '@testing-library/user-event';
import SignInForm from './sign-in-form';
import HistoryRouter from '../history-route';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import thunk from 'redux-thunk';
import { Routes, Route } from 'react-router-dom';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
});

const authStore = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Auth, error: null},
});

const errorStore = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: true},
});

describe('Component: Sign in form', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    const emailElement = screen.getByPlaceholderText('Email address');
    const passwordElement = screen.getByPlaceholderText('Password');
    const submitElement = screen.getByText('Sign in');

    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
    expect(submitElement).toBeInTheDocument();
  });

  it('should dispatch loginAction if user entered correct data', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    const emailElement = screen.getByPlaceholderText('Email address');
    const passwordElement = screen.getByPlaceholderText('Password');
    const submitElement = screen.getByText('Sign in');

    await userEvent.type(emailElement, 'test@test.com');
    await userEvent.type(passwordElement, 'secret');
    await userEvent.click(submitElement);

    const actions = store.getActions();
    expect(actions[0].type).toBe('user/login/pending');
  });

  it('should redirect user to Main page if user loggined successfully', () => {

    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<SignInScreen />}
            />
            <Route
              path={AppRoute.Root}
              element={<h1>Mock Main Screen</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );
    expect(history.location.pathname).toBe(AppRoute.Root);
    expect(screen.getByText('Mock Main Screen')).toBeInTheDocument();
  });

  it('should render error correctly if user entered wrong data', () => {

    render(
      <Provider store={errorStore}>
        <HistoryRouter history={history}>
          <SignInForm />
        </HistoryRouter>
      </Provider>
    );

    const errorElement = screen.getByText(/Please enter a valid email address/i);
    expect(errorElement).toBeInTheDocument();
  });
});
