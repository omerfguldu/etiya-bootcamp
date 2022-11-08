import { CustomerState } from './customer/customer.state';
import { AuthStoreState } from './auth/auth.state';

export interface AppStoreState {
  auth: AuthStoreState;
  customer: CustomerState;
  // customerToRegister: CustomerToRegister;
}
