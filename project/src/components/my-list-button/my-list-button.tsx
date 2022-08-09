import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeFavouriteFilmStatus, fetchFavouriteFilms } from '../../store/api-actions';
import { getFavoriteFilms, getFavoriteFilmsLength, getLoadingStatus } from '../../store/favorite-process/selectors';
import { getFilmID, getFilmStatus } from '../../store/film-process/selectors';
import { FavouriteData } from '../../types/favourite-data';
import './my-list-button.css';


function MyListButton(): JSX.Element {
  const dispatch = useAppDispatch();
  const loadingStatus = useAppSelector(getLoadingStatus);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const favoriteFilmsLength = useAppSelector(getFavoriteFilmsLength);
  const filmID = useAppSelector(getFilmID);
  const filmStatus = useAppSelector(getFilmStatus);
  const a = favoriteFilms.filter((filmB) => filmB.id === filmID);

  const onMyListButtonClickHandler = () => {
    const data: FavouriteData = {
      filmId: String(filmID),
      filmStatus: filmStatus,
    };
    dispatch(changeFavouriteFilmStatus(data));
    dispatch(fetchFavouriteFilms());
  };

  useEffect(() => {
    dispatch(fetchFavouriteFilms());
  }, [filmStatus, dispatch]);

  return (
    <button className="btn btn--list film-card__button" type="button" onClick={onMyListButtonClickHandler} disabled={loadingStatus}>
      <svg viewBox="0 0 18 14" width="18" height="14">
        <use xlinkHref={filmStatus ? '#in-list' : '#add'}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilmsLength}</span>
    </button>
  );
}

export default MyListButton;
