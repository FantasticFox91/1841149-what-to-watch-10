import { useAppSelector } from '../../hooks';
import { getFilm } from '../../store/film-process/selectors';
import { humanazeFilmDuration } from '../../utils/humazie';
import DetailsStar from '../details-star/details-star';
import './details.css';

function Details(): JSX.Element {
  const film = useAppSelector(getFilm);
  const actorsList = film?.starring?.map((star) =>
    <DetailsStar key={star} star={star} />
  );


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
          <span className="film-card__details-value">{film?.runTime !== undefined ? humanazeFilmDuration(film.runTime) : 'Unknown'}</span>
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
