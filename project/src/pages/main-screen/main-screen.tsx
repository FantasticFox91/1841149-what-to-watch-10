import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useNavigate } from 'react-router-dom';
import Catalog from '../../components/catalog/catalog';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingScreen from '../loading-screen/loading-screen';
import { getLoadingDataStatus, getPromoFilm } from '../../store/film-process/selectors';
import MyListButton from '../../components/my-list-button/my-list-button';
import { useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import MyListButtonNoAuth from '../../components/my-list-button-no-auth/my-list-button-no-auth';
import { setFilm } from '../../store/action';

function MainScreen(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const promoFilm = useAppSelector(getPromoFilm);
  const isDataLoading = useAppSelector(getLoadingDataStatus);
  const authStatus = useAppSelector(getAuthorizationStatus);

  const playButtonClickHandler = () => {
    const path = `/player/${promoFilm?.id}`;
    navigate(path);
  };


  useEffect(() => {
    dispatch(setFilm(promoFilm));
  }, [promoFilm, dispatch]);

  if (isDataLoading) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm?.backgroundImage} alt={promoFilm?.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm?.posterImage} alt={promoFilm?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm?.genre}</span>
                <span className="film-card__year">{promoFilm?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={() => playButtonClickHandler()}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                {authStatus === AuthorizationStatus.Auth ? <MyListButton /> : <MyListButtonNoAuth />}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <Catalog />

        <Footer />
      </div>
    </>
  );
}

export default MainScreen;
