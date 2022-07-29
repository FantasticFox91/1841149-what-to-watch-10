import { useAppSelector } from '../../hooks';
import { Film } from '../../types/films';
import ShowMoreButton from '../show-more-button/show-more-button';
import VideoPlayer from '../video-player/video-player';

function FilmsListWithButton({films} : {films: Film[]}): JSX.Element {
  const selectedGenre = useAppSelector((state) => state.genre);

  const sortedFilms = films.filter((film) => selectedGenre === 'All genres' ? films : film.genre === selectedGenre);

  const filmsList =
      sortedFilms.map((film, index) => (
        <VideoPlayer key={film.id} film={film} index={index}/>
      ));

  return (
    <>
      <div className="catalog__films-list">
        {filmsList}
      </div>
      <ShowMoreButton sortedFilms={sortedFilms} />
    </>
  );
}

export default FilmsListWithButton;
