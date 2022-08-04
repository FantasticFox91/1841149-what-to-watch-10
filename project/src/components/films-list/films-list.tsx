import { Film } from '../../types/films';
import VideoPlayer from '../video-player/video-player';

type FilmListProps = {
  films: Film[];
}

function FilmsList({films}: FilmListProps): JSX.Element {
  const filmsList =
      films.map((film) => (
        <VideoPlayer key={film.id} film={film} />
      ));

  return (
    <div className="catalog__films-list">
      {filmsList}
    </div>
  );
}

export default FilmsList;
