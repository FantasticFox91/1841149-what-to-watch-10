import { useAppDispatch, useAppSelector } from '../../hooks';
import { GENRES_LIST } from '../../const';
import GenreButton from '../genre-button/genre-button';
import { showAnotherGenre } from '../../store/action';
import { getGenre } from '../../store/genre-process/selector';

function GenresList(): JSX.Element {
  const selectedGenre = useAppSelector(getGenre);

  const dispatch = useAppDispatch();

  const onTabClickHandler = (evt: React.MouseEvent) => {
    const clickedGenre = evt.currentTarget.textContent;
    if (clickedGenre !== null) {
      dispatch(showAnotherGenre(clickedGenre));
    }
  };

  const generateGenreTab =
  GENRES_LIST.map((genre) => (
    <GenreButton key={genre} genre={genre} isActive={selectedGenre === genre} onClick={onTabClickHandler} />
  ));

  return (
    <ul className="catalog__genres-list">
      {generateGenreTab}
    </ul>
  );
}

export default GenresList;
