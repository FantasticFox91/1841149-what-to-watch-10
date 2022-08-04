import { useMemo } from 'react';
import { useAppSelector } from '../../hooks';
import { getFilteredFilms } from '../../store/films-process/selector';
import { getRenderedFilmCount } from '../../store/genre-process/selector';
import ShowMoreButton from '../show-more-button/show-more-button';
import VideoPlayer from '../video-player/video-player';

function FilmsListWithButton(): JSX.Element {
  const films = useAppSelector(getFilteredFilms);
  const renderedFilmCount = useAppSelector(getRenderedFilmCount);

  const filmsList = useMemo(() => films?.slice(0, renderedFilmCount).map((film) => (
    <VideoPlayer key={film.id} film={film} />
  )), [renderedFilmCount, films]);

  return (
    <>
      <div className="catalog__films-list">
        {filmsList}
      </div>
      <ShowMoreButton sortedFilms={films} />
    </>
  );
}

export default FilmsListWithButton;
