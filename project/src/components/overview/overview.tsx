import { MAX_ACTORS_IN_OVERVIEW } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFilm } from '../../store/film-process/selectors';

function Overview(): JSX.Element {
  const film = useAppSelector(getFilm);
  const actorsOverviewList = film?.starring.slice(0, MAX_ACTORS_IN_OVERVIEW).join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film?.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film?.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film?.description}</p>

        <p className="film-card__director"><strong>Director: {film?.director}</strong></p>

        <p className="film-card__starring"><strong>Starring: {actorsOverviewList} and others</strong></p>
      </div>
    </>
  );
}

export default Overview;
