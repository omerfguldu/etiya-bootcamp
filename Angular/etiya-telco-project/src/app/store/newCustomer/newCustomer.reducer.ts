import {
  setNewCustomerServices,
  setNewCustomerCatalogs,
  deleteNewCustomerCatalogs,
  deleteNewCustomerServices,
  setNewIndividualCustomerInfo,
  deleteNewIndividualCustomerInfo,
  setNewCorporateCustomerInfo,
  deleteNewCorporateCustomerInfo,
} from './newCustomer.actions';
import {
  NewCustomerStoreState,
  initialNewCustomerStoreState,
} from './newCustomer.state';
import { createReducer, on } from '@ngrx/store';

export const newCustomerReducer = createReducer<NewCustomerStoreState>(
  initialNewCustomerStoreState,
  on(setNewIndividualCustomerInfo, (currentState, action) => {
    return {
      ...currentState,
      info: action.newIndividualCustomerInfo,
    };
  }),
  on(deleteNewIndividualCustomerInfo, (currentState) => {
    return {
      ...currentState,
      info: null,
    };
  }),
  on(setNewCorporateCustomerInfo, (currentState, action) => {
    return {
      ...currentState,
      info: action.newCorporateCustomerInfo,
    };
  }),
  on(deleteNewCorporateCustomerInfo, (currentState) => {
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
