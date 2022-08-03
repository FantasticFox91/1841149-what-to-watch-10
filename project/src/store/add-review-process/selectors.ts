import { NameSpace} from '../../const';
import { errorReviewData } from '../../types/review-data';
import { State } from '../../types/state';

export const getError = (state: State): errorReviewData | null | unknown => state[NameSpace.AddReview].error;

