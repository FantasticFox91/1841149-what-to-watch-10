import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MoviePage from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import ServerErrorScreen from '../../pages/server-error-screen/server-error-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const authStatus = useAppSelector(getAuthorizationStatus);
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element=
          {
            <MainScreen />
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
            <PrivateRoute authorizationStatus={authStatus}>
              <MyListScreen />
            </PrivateRoute>
          }
      />
      <Route path={AppRoute.Film} element={<MoviePage />} />
      <Route path={AppRoute.Player} element={<PlayerScreen />}>
        <Route path=":id" element={<PlayerScreen />} />
      </Route>
      <Route
        path={AppRoute.AddReview}
        element=
          {
            <PrivateRoute authorizationStatus={authStatus}>
              <AddReviewScreen />
            </PrivateRoute>
          }
      />
      <Route
        path={AppRoute.NotFound}
        element={<PageNotFoundScreen />}
      />
      <Route
        path={AppRoute.ServerError}
        element={<ServerErrorScreen />}
      />
    </Routes>
  );
}

export default App;
