import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MoviePage from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import PrivateRoute from '../private-route/private-route';

type AppScreenProps = {
  title: string,
  genre: string,
  year: number,
  isLogined: boolean,
};

function App({title, genre, year, isLogined}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element=
            {
              <MainScreen
                title={title}
                genre={genre}
                year={year}
                isLogined
              />
            }
        />
        <Route
          path={AppRoute.Login}
          element={<SignInScreen />}
        />
        <Route
          path={AppRoute.MyList}
          element=
            {
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <MyListScreen isLoggined={isLogined}/>
              </PrivateRoute>
            }
        />
        <Route path={AppRoute.Film} element={<MoviePage isLogined={isLogined}/>} />
        <Route path={AppRoute.Player} element={<PlayerScreen />}>
          <Route path=":id" element={<PlayerScreen />} />
        </Route>
        <Route
          path={AppRoute.AddReview}
          element=
            {
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
              >
                <AddReviewScreen />
              </PrivateRoute>
            }
        />
        <Route
          path={AppRoute.NotFound}
          element={<PageNotFoundScreen isLogined={isLogined}/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
