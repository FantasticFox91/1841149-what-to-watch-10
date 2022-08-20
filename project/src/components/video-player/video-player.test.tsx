import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../components/history-router';
import { AuthorizationStatus } from '../../const';
import { makeFakeFilm } from '../../utils/mock';
import VideoPlayer from './video-player';

const history = createMemoryHistory();
const film = makeFakeFilm();
const mockStore = configureMockStore();
const fakeStore = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.NoAuth, error: null},
});

describe('Component: Video player', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = () => Promise.resolve();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <VideoPlayer film={film}/>
        </HistoryRouter>
      </Provider>
    );

    const headerElement = screen.getByText(`${film.name}`);
    const videoElement = screen.getByTestId('video');
    expect(headerElement).toBeInTheDocument();
    expect(videoElement).toBeInTheDocument();
  });
});
