import { GENRE_TABS, NameSpace} from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/films';
import { createSelector } from 'reselect';

export const getFilms = (state: State): Film[] | [] => state[NameSpace.Films].films;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Films].isDataLoading;
export const getGenre = (state: State): string => state[NameSpace.Genre].genre;
export const getFilteredFilms = createSelector(
  [getFilms, getGenre],
  (films, genre) => {
    switch(genre) {
      case GENRE_TABS.COMEDIE:
        return films.filter((film) => film.genre === GENRE_TABS.COMEDIE);
      case GENRE_TABS.CRIME:
        return films.filter((film) => film.genre === GENRE_TABS.CRIME);
      case GENRE_TABS.DOCUMENTARY:
        return films.filter((film) => film.genre === GENRE_TABS.DOCUMENTARY);
      case GENRE_TABS.DRAMA:
        return films.filter((film) => film.genre === GENRE_TABS.DRAMA);
      case GENRE_TABS.HORROR:
        return films.filter((film) => film.genre === GENRE_TABS.HORROR);
      case GENRE_TABS.KIDS_AND_FAMILY:
        return films.filter((film) => film.genre === GENRE_TABS.KIDS_AND_FAMILY);
      case GENRE_TABS.ROMANCE:
        return films.filter((film) => film.genre === GENRE_TABS.ROMANCE);
      case GENRE_TABS.SCI_FI:
        return films.filter((film) => film.genre === GENRE_TABS.SCI_FI);
      case GENRE_TABS.THRILLER:
        return films.filter((film) => film.genre === GENRE_TABS.THRILLER);
      default:
        return films;
    }
  }
);
