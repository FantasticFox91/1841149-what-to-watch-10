import { NameSpace} from '../../const';
import { State } from '../../types/state';
import { Film } from '../../types/films';

export const getFilms = (state: State): Film[] | [] => state[NameSpace.Films].films;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Films].isDataLoading;
