import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MoviePage from '../../pages/movie-page-screen/movie-page-screen';
import MyListScreen from '../../pages/my-list-screen/my-list-screen';
import PageNotFoundScreen from '../../pages/page-not-found-screen/page-not-found-screen';
import PlayerScreen from '../../pages/player-screen/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import PrivateRoute from '../private-route/private-route';


function App(): JSX.Element {
  return (
    <BrowserRouter>
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
              <PrivateRoute >
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
              <PrivateRoute >
                <AddReviewScreen />
              </PrivateRoute>
            }
        />
        <Route
          path={AppRoute.NotFound}
          element={<PageNotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
