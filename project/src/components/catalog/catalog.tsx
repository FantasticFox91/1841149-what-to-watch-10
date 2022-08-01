import { useEffect } from 'react';
import { CARDS_PER_STEP, INITAL_FILMS_GENRE } from '../../const';
import { useAppDispatch } from '../../hooks';
import { resetFilmsList } from '../../store/action';
import { Film } from '../../types/films';
import FilmsListWithButton from '../film-list-with-button/films-list-with-button';
import GenresList from '../genres-list/genres-list';

function Catalog({films} : {films: Film[]}): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetFilmsList({filmsToShow: CARDS_PER_STEP, genre: INITAL_FILMS_GENRE}));
  });

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>

      <GenresList />

      <FilmsListWithButton films={films}/>

    </section>
  );
}

export default Catalog;
