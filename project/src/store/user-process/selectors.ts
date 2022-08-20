import { NameSpace, AuthorizationStatus } from '../../const';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getError = (state: State) => state[NameSpace.User].error;
export const getUserAvatar = (state: State) => state[NameSpace.User].userAvatar;
