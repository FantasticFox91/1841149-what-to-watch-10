import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarFilms } from '../../store/api-actions';
import { getSimilarFilms } from '../../store/film-process/selectors';
import FilmsList from '../films-list/films-list';

function SimilarFilmsList(): JSX.Element {
  const similarFilms = useAppSelector(getSimilarFilms);
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchSimilarFilms(params?.id));
  }, [params?.id, dispatch]);

  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>
      {similarFilms.length > 0 ? <FilmsList films={similarFilms}/> : <p>We are sory but we can&apos;t find siimilar films in out database</p>}
    </section>
  );
}

export default SimilarFilmsList;
