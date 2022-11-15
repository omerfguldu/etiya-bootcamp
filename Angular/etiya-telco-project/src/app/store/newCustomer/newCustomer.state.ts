import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { IndividualCustomer } from 'src/app/models/individualCustomer';
import { Catalog } from './../../models/catalog';
import { Service } from 'src/app/models/service';

export interface NewCustomerStoreState {
  info: IndividualCustomer | CorporateCustomer | null;
  services: Service[];
  catalogs: Catalog[];
}

export const initialNewCustomerStoreState: NewCustomerStoreState = {
  info: null,
  services: [],
  catalogs: [],
};
