import { useAppDispatch, useAppSelector } from '../../hooks';
import GenreButton from '../genre-button/genre-button';
import { getGenre } from '../../store/genre-process/selector';
import { getFilms } from '../../store/films-process/selector';
import { INITAL_FILMS_GENRE, MAX_GENRES_TABS } from '../../const';
import { showAnotherGenre } from '../../store/genre-process/genre-process';

function GenresList(): JSX.Element {
  const selectedGenre = useAppSelector(getGenre);
  const films = useAppSelector(getFilms);
  const genresList = [INITAL_FILMS_GENRE, ...new Set(films.map((film) => film.genre))].slice(0, MAX_GENRES_TABS);

  const dispatch = useAppDispatch();

  const onTabClickHandler = (evt: React.MouseEvent) => {
    const clickedGenre = evt.currentTarget.textContent as string;
    dispatch(showAnotherGenre(clickedGenre));
  };

  const generateGenreTab =
  genresList.map((genre) => (
    <GenreButton key={genre} genre={genre} isActive={selectedGenre === genre} onClick={onTabClickHandler} />
  ));

  return (
    <ul className="catalog__genres-list">
      {generateGenreTab}
    </ul>
  );
}

export default GenresList;
