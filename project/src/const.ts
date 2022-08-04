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
  Comments = '/comments',
}

enum NameSpace {
  User = 'USER',
  PromoFilm = 'PROMO_FILM',
  Films = 'FILMS',
  Film = 'FILM',
  Genre = 'GENRE',
  AddReview = 'ADD_REVIEW',
}

enum GENRE_TABS {
  ALL = 'All genres',
  COMEDIE = 'Comedie',
  CRIME = 'Crime',
  DOCUMENTARY = 'Documentary',
  DRAMA = 'Drama',
  HORROR = 'Horror',
  KIDS_AND_FAMILY = 'Kids & Family',
  ROMANCE = 'Romance',
  SCI_FI = 'Sci-Fi',
  THRILLER = 'Thriller',
}

const GENRES_LIST = [
  'All genres',
  'Comedie',
  'Crime',
  'Documentary',
  'Drama',
  'Horror',
  'Kids & Family',
  'Romance',
  'Sci-Fi',
  'Thriller'
];

const INITAL_FILMS_GENRE = 'All genres';

const CARDS_PER_STEP = 8;

const TIMEOUT_SHOW_ERROR = 2000;

export { AppRoute, AuthorizationStatus, APIRoute, NameSpace, GENRES_LIST, INITAL_FILMS_GENRE, CARDS_PER_STEP, GENRE_TABS, TIMEOUT_SHOW_ERROR };
