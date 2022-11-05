import { TokenUserModel } from './../../models/tokenUserModel';
import { createAction, props } from '@ngrx/store';

export const setTokenUserModel = createAction(
  '[Auth] Set Token User Model', //* benzersiz key verdik. bu action type/id olacak.
  props<{ tokenUserModel: TokenUserModel }>() //* inline bir interface yazdik. Bu interface'in icindeki propertyler, action'in icindeki payloadlar olacak
);

export const deleteTokenUserModel = createAction(
  '[Auth] Delete Token User Model'
);
