import { CARDS_PER_STEP } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { showMoreFilms } from '../../store/action';
import { getRenderedFilmCount } from '../../store/genre-process/selector';
import { Film } from '../../types/films';

type ShowMoreButtonProps = {
  sortedFilms: Film[] | [];
}

function ShowMoreButton({sortedFilms}: ShowMoreButtonProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const filmsToShow = useAppSelector(getRenderedFilmCount);

  const onShowMoreButtonClickHandler = () => {
    dispatch(showMoreFilms(filmsToShow + CARDS_PER_STEP));
  };

  if (filmsToShow < sortedFilms.length) {
    return (
      <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={onShowMoreButtonClickHandler}>Show more</button>
      </div>
    );
  }
  return null;
}

export default ShowMoreButton;
