import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function MyListButtonNoAuth(): JSX.Element {
  return (
    <Link to={AppRoute.Login} className="btn btn--list film-card__button" >
      <svg viewBox="0 0 18 14" width="18" height="14" role="svg">
        <use xlinkHref="#add"></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">0</span>
    </Link>
  );
}

export default MyListButtonNoAuth;
