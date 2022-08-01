enum AppRoute {
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  MoviePage = '/films/',
  AddReview = '/films/:id/review',
  Root = '/',
  Player = '/player',
  NotFound = '*',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}

const GENRE_TABS = [
  'All genres',
  'Comedie',
  'Crime',
  'Documentary',
  'Drama',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

const INITAL_FILMS_GENRE = 'All genres';

const CARDS_PER_STEP = 8;

export { AppRoute, AuthorizationStatus, APIRoute, INITAL_FILMS_GENRE, CARDS_PER_STEP, GENRE_TABS };
