import { NewCustomerStoreState } from './newCustomer/newCustomer.state';
import { catalogsToRegisterStoreState } from './catalogsToRegister/catalogsToRegister.state';
import { CustomerToRegisterStoreState } from './customerToRegister/customerToRegister.state';

export interface AppStoreState {
  customerToRegister: CustomerToRegisterStoreState;
  catalogsToRegister: catalogsToRegisterStoreState;
  newCustomer: NewCustomerStoreState;
}
