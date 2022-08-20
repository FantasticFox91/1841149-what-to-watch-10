import { configureStore } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { createAPI } from '../services/api';
import { redirectToRoot } from './action';
import { redirect } from './middlewares/redirect';
import { rootReducer } from './root-reducer';

export const api = createAPI(() => store.dispatch(redirectToRoot(AppRoute.ServerError)));

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});
