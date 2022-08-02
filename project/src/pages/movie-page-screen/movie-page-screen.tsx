import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddReviewButton from '../../components/add-review-button/add-review-button';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SimilarFilmsList from '../../components/similar-films-list/similar-films-list';
import Tabs from '../../components/tabs/tabs';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFilm, fetchFilmComments, fetchSimilarFilms } from '../../store/api-actions';

function MoviePageScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.film);
  const similarFilms = useAppSelector((state) => state.similarFilms);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const favoriteFilmsLength = useAppSelector((state) => state.films).filter((filmA) => filmA.isFavorite).length;
  const filmComments = useAppSelector((state) => state.filmComments);
  const navigate = useNavigate();
  const params = useParams();

  const onPlayButtonClickHandler = () => {
    const path = `/player/${film?.id}`;
    navigate(path);
  };

  const onMyListButtonClickHandler = () => {
    const path = '/mylist';
    navigate(path);
  };

  const style = {
    backgroundColor: `${film?.backgroundColor}`
  };

  useEffect(() => {
    dispatch(fetchFilm(params?.id));
    dispatch(fetchSimilarFilms(params?.id));
    dispatch(fetchFilmComments(params?.id));
  }, [params?.id, dispatch]);

  return (
    <>
      <section className="film-card film-card--full" style={style}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film?.backgroundImage} alt={film?.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>
          <Header />

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film?.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film?.genre}</span>
                <span className="film-card__year">{film?.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button" onClick={onPlayButtonClickHandler}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button" onClick={onMyListButtonClickHandler}>
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">{favoriteFilmsLength}</span>
                </button>
                {authStatus === AuthorizationStatus.Auth ? <AddReviewButton id={film?.id} /> : null}
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film?.posterImage} alt={film?.name} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <Tabs film={film || null} comments={filmComments}/>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <SimilarFilmsList similarFilms={similarFilms} />
        <Footer />
      </div>
    </>
  );
}

export default MoviePageScreen;
