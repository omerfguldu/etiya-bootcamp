import { CorporateCustomer } from './corporateCustomer';
import { IndividualCustomer } from './individualCustomer';
export interface CustomerToRegisterModel {
  individualCustomer?: IndividualCustomer;
  corporateCustomer?: CorporateCustomer;
}
