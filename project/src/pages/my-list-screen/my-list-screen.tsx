import FilmCard from '../../components/film-card/film-card';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getFilms } from '../../store/films-process/selector';

function MyListScreen(): JSX.Element {
  const films = useAppSelector(getFilms).filter((film) => film.isFavorite);
  const filmsList =
    films?.map((film) => (
      <FilmCard key={film.id} id={film.id} previewImage={film.previewImage} name={film.name}/>
    ));

  return (
    <div className="user-page">
      <Header />

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
