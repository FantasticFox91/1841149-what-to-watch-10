import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import MyListButton from './my-list-button';
import thunk from 'redux-thunk';
import { createAPI } from '../../services/api';
import { redirectToRoot } from '../../store/action';
import { AppRoute } from '../../const';

const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  FAVORITE: { favoriteFilms: [], isDataLoading: false},
  FILM: {promoFilm: [], film: [], filmComments: [], similarFilms: [], isDataLoading: false},
});

describe('Component: Genre button', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MyListButton />
      </Provider>
    );

    const textElement = screen.getByText(/My list/i);
    expect(textElement).toBeInTheDocument();
  });

  it('should dispatch action when user click on Button', async () => {

    render(
      <Provider store={store}>
        <MyListButton />
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('favorite/fetchFavoriteFilms/pending');
  });
});
