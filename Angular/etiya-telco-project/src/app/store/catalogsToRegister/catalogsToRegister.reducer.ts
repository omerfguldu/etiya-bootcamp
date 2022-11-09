import { createReducer, on } from '@ngrx/store';
import { deleteCustomerToRegisterModel } from '../customerToRegister/customerToRegister.actions';
import { addCatalogsToCatalogsRegisterModel } from './catalogsToRegister.actions';
import {
  catalogsToRegisterStoreState,
  initialCatalogsToRegisterStoreState,
} from './catalogsToRegister.state';

export const catalogsToRegisterReducer =
  createReducer<catalogsToRegisterStoreState>(
    initialCatalogsToRegisterStoreState,
    on(addCatalogsToCatalogsRegisterModel, (currentState, action) => {
      return { ...currentState, catalogsToRegister: action.catalogsToRegister };
    }),
    on(deleteCustomerToRegisterModel, (currentState) => {
      return {
        ...currentState,
        customerToRegisterModel: null,
      };
    })
  );
