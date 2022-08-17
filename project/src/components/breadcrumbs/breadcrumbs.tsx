import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getFilm } from '../../store/film-process/selectors';

function Breadcrumbs(): JSX.Element {
  const film = useAppSelector(getFilm);
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={`/films/${film?.id}`} className="breadcrumbs__link">{film?.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to="#" className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;
