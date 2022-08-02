import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import './page-not-found.css';

function PageNotFoundScreen(): JSX.Element {
  return (
    <section className="film-card film-card--full page-not-found">
      <div className="film-card__header">
        <div className="film-card__bg">
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />
      </div>
      <div className='page-not-found__container'>
        <div className="page-not-found__message">
          <h2 className='page-not-found__text'>
            404.
            <br />
            <small>Page not found</small>
          </h2>
          <Link to={AppRoute.Root} className='page-not-found__link'>Go to main page</Link>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default PageNotFoundScreen;
