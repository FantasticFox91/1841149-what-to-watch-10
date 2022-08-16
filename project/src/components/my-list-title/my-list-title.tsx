import { useAppSelector } from '../../hooks';
import { getFavoriteFilmsLength } from '../../store/favorite-process/selectors';

function MyListTitle(): JSX.Element {
  const favoriteFilmsLengt = useAppSelector(getFavoriteFilmsLength);

  return (
    <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsLengt}</span></h1>
  );
}

export default MyListTitle;
