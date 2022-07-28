enum AppRoute {
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
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

export { AppRoute, AuthorizationStatus, INITAL_FILMS_GENRE, CARDS_PER_STEP, GENRE_TABS };
