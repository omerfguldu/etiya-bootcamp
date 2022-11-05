import { createReducer } from '@ngrx/store';
import { on } from '@ngrx/store';
import { deleteTokenUserModel, setTokenUserModel } from './auth.actions';
import { AuthStoreState, initialAuthStoreState } from './auth.state';

export const authReducer = createReducer<AuthStoreState>(
  initialAuthStoreState,
  on(setTokenUserModel, (currentState, action) => {
    //* store'daki state'i guncellemek icin referansinin degismesi gerekir
    //* currentState.tokenUserModel = action.tokenUserModel;
    //* currentState.roles.push(action.role);
    //* Cunku componentler state'lerin stack adreslerini izliyorlar. Referans degismedigi surece, componentler state'i guncelleyemez.
    return {
      ...currentState,
      tokenUserModel: action.tokenUserModel,
    };
  }),
  on(deleteTokenUserModel, (currentState) => {
    return {
      ...currentState,
      tokenUserModel: null,
    };
  })

  //* on(addRole, (state, action) => {
  //!   currentState.roles.push(action.role);
  //*   return {...currentState, roles: [...currentState.roles, action.role]};
  //* }),
);
