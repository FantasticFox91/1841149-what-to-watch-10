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
  Favourite = '/favorite',
}

enum NameSpace {
  User = 'USER',
  Films = 'FILMS',
  Film = 'FILM',
  Genre = 'GENRE',
  AddReview = 'ADD_REVIEW',
  Favorite = 'FAVORITE',
}

const INITAL_FILMS_GENRE = 'All genres';

const CARDS_PER_STEP = 8;

const TIMEOUT_SHOW_ERROR = 2000;

const MAX_ACTORS_IN_OVERVIEW = 4;

const MAX_GENRES_TABS = 9;

export { AppRoute, AuthorizationStatus, APIRoute, NameSpace, INITAL_FILMS_GENRE, CARDS_PER_STEP, TIMEOUT_SHOW_ERROR, MAX_ACTORS_IN_OVERVIEW, MAX_GENRES_TABS };
