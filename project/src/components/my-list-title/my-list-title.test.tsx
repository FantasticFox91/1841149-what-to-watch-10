import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyListTitle from './my-list-title';

const mockStore = configureMockStore();
const store = mockStore({
  FAVORITE: { favoriteFilms: [], isDataLoading: false},
});

describe('Component: My List Title', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MyListTitle />
      </Provider>
    );

    const textElement = screen.getByText(/My list/i);
    expect(textElement).toBeInTheDocument();
  });
});
