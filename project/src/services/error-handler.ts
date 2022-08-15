import { TIMEOUT_SHOW_ERROR } from '../const';
import { store } from '../store';
import { setError } from '../store/user-process/user-process';

export const processErrorHandle = (): void => {
  setTimeout(
    () => store.dispatch(setError(false)),
    TIMEOUT_SHOW_ERROR,
  );
};
