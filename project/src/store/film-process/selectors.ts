import { NameSpace} from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/films';
import { ReviewData } from '../../types/review-data';

export const getFilm = (state: State): Film | null => state[NameSpace.Film].film;
export const getFilmComments = (state: State): ReviewData[] => state[NameSpace.Film].filmComments;
export const getSimilarFilms = (state: State): Film[] => state[NameSpace.Film].similarFilms;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Film].isDataLoading;
