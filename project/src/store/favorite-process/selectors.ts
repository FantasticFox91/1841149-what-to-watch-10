import { NameSpace} from '../../const';
import { State } from '../../types/state';

export const getFavoriteFilms = (state: State) => state[NameSpace.Favorite].favoriteFilms;
export const getLoadingStatus = (state: State) => state[NameSpace.Favorite].isDataLoading;
export const getFavoriteFilmsLength = (state: State) => state[NameSpace.Favorite].favoriteFilms.length;
