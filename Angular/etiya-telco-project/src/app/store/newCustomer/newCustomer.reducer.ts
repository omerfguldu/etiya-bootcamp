import {
  setNewCustomerServices,
  setNewCustomerCatalogs,
  deleteNewCustomerCatalogs,
  deleteNewCustomerServices,
  setNewCustomerInfo,
  deleteNewCustomerInfo,
} from './newCustomer.actions';
import {
  NewCustomerStoreState,
  initialNewCustomerStoreState,
} from './newCustomer.state';
import { createReducer, on } from '@ngrx/store';

export const newCustomerReducer = createReducer<NewCustomerStoreState>(
  initialNewCustomerStoreState,
  on(setNewCustomerInfo, (currentState, action) => {
    return {
      ...currentState,
      info: action.newCustomerInfo,
    };
  }),
  on(deleteNewCustomerInfo, (currentState) => {
    return {
      ...currentState,
      info: null,
    };
  }),
  on(setNewCustomerServices, (currentState, action) => {
    return {
      ...currentState,
      services: action.newCustomerServices,
    };
  }),
  on(deleteNewCustomerServices, (currentState) => {
    return {
      ...currentState,
      services: [],
    };
  }),
  on(setNewCustomerCatalogs, (currentState, action) => {
    return {
      ...currentState,
      catalogs: action.newCustomerCatalogs,
    };
  }),
  on(deleteNewCustomerCatalogs, (currentState) => {
    return {
      ...currentState,
      catalogs: [],
    };
  })
);
