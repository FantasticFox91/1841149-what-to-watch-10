import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type LogoProps = {
  isInFooter?: boolean
}

function Logo({isInFooter}: LogoProps): JSX.Element {
  return (
    <div className="logo">
      <Link to={AppRoute.Root} title='/' className={isInFooter ? 'logo__link logo__link--light' : 'logo__link'}>
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
}

export default Logo;
