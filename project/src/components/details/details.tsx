import { Film } from '../../types/films';
import DetailsStar from '../details-star/details-star';
import './details.css';

type DetailsProps = {
  film: Film | null;
}

function Details({film}: DetailsProps): JSX.Element {
  const actorsList = film?.starring?.map((star) =>
    <DetailsStar key={star} star={star} />
  );

  const huminazeFilmDuration = (minutes: number): string | null => {
    const MINUTES_IN_HOUR = 60;
    const hours = minutes / MINUTES_IN_HOUR;
    if (hours < 1) {
      return `${minutes}m`;
    } else if ((minutes % MINUTES_IN_HOUR) === 0) {
      return `${hours.toFixed(0)}h`;
    }
    return `${hours.toFixed(0)}h ${minutes % MINUTES_IN_HOUR}m` ;
  };

  return (
    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film?.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          {actorsList}
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{film?.runTime !== undefined ? huminazeFilmDuration(film.runTime) : null}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film?.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film?.released}</span>
        </p>
      </div>
    </div>
  );
}

export default Details;
