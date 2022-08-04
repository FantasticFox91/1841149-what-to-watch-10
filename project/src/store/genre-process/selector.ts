import { GENRE_TABS, NameSpace} from '../../const';
import { State } from '../../types/state';

export const getGenre = (state: State): GENRE_TABS => state[NameSpace.Genre].genre;
export const getRenderedFilmCount = (state: State): number => state[NameSpace.Genre].renderedFilmCount;
