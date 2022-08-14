import { INITAL_FILMS_GENRE, NameSpace} from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/films';
import { createSelector } from 'reselect';

export const getFilms = (state: State): Film[] | [] => state[NameSpace.Films].films;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Films].isDataLoading;
export const getGenre = (state: State): string => state[NameSpace.Genre].genre;
export const getFilteredFilms = createSelector(
  [getFilms, getGenre],
  (films, genre) => (genre === INITAL_FILMS_GENRE) ? films : films.filter((film) => film.genre === genre)
);
