import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { Catalog } from './../../models/catalog';
import { Service } from './../../models/service';
import { createAction, props } from '@ngrx/store';

//* NEW CUSTOMER INFO ACTIONS
export const setNewIndividualCustomerInfo = createAction(
  '[New Customer Info] Set New Individual Customer Info',
  props<{ newIndividualCustomerInfo: IndividualCustomer }>()
);

export const deleteNewIndividualCustomerInfo = createAction(
  '[New Customer Info] Delete New Individual Customer Info'
);

export const setNewCorporateCustomerInfo = createAction(
  '[New Customer Info] Set New Corporate Customer Info',
  props<{ newCorporateCustomerInfo: CorporateCustomer }>()
);

export const deleteNewCorporateCustomerInfo = createAction(
  '[New Customer Info] Delete New Corporate Customer Info'
);

//* NEW CUSTOMER SERVICES ACTIONS
export const setNewCustomerServices = createAction(
  '[New Customer Services] Set New Customer Services',
  props<{ newCustomerServices: Service[] }>()
);

export const deleteNewCustomerServices = createAction(
  '[New Customer Services] Delete New Customer Services'
);

//* NEW CUSTOMER CATALOGS ACTIONS
export const setNewCustomerCatalogs = createAction(
  '[New Customer Catalogs] Set New Customer Catalogs',
  props<{ newCustomerCatalogs: Catalog[] }>()
);

export const deleteNewCustomerCatalogs = createAction(
  '[New Customer Catalogs] Delete New Customer Catalogs'
);
