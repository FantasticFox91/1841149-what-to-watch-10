import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFavoriteFilms } from '../../store/favorite-process/selectors';

function MyListScreen(): JSX.Element {
  const films = useAppSelector(getFavoriteFilms);
  const filmsList =
    films?.map((film) => (
      <FilmCard key={film.id} id={film.id} previewImage={film.previewImage} name={film.name}/>
    ));

  return (
    <div className="user-page">
      <Header isInMyList/>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__films-list">
          {filmsList}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;
