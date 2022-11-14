import { newCustomerReducer } from './newCustomer/newCustomer.reducer';
import { catalogsToRegisterReducer } from './catalogsToRegister/catalogsToRegister.reducer';
import { customerToRegisterReducer } from './customerToRegister/customerToRegister.reducer';

export const appReducers = {
  customerToRegister: customerToRegisterReducer,
  catalogsToRegister: catalogsToRegisterReducer,
  newCustomer: newCustomerReducer,
  // customerToRegister: customerToRegisterReducer,
};
