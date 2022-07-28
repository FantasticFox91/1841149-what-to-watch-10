import { useAppDispatch, useAppSelector } from '../../hooks';
import { GENRE_TABS } from '../../const';
import GenreButton from '../genre-button/genre-button';
import { showAnotherGenre } from '../../store/action';


function GenresList(): JSX.Element {
  const selectedGenre = useAppSelector((state) => state.genre);

  const dispatch = useAppDispatch();

  const onTabClickHandler = (evt: React.MouseEvent) => {
    const clickedGenre = evt.currentTarget.textContent;
    if (clickedGenre !== null) {
      dispatch(showAnotherGenre(clickedGenre));
    }
  };

  const generateGenreTab =
  GENRE_TABS.map((genre) => (
    <GenreButton key={genre} genre={genre} isActive={selectedGenre === genre} onClick={onTabClickHandler} />
  ));

  return (
    <ul className="catalog__genres-list">
      {generateGenreTab}
    </ul>
  );
}

export default GenresList;
