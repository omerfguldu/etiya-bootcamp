import { customerReducer } from './customer/customer.reducer';
import { authReducer } from './auth/auth.reducer';

export const appReducers = {
  auth: authReducer,
  customer: customerReducer,
  // customerToRegister: customerToRegisterReducer,
};
