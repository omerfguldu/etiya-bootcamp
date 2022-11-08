import { setCustomerInfoModel } from './customer.actions';
import { CustomerState, initialCustomerState } from './customer.state';
import { createReducer, on } from '@ngrx/store';

export const customerReducer = createReducer<CustomerState>(
  initialCustomerState,
  on(setCustomerInfoModel, (currentState, action) => {
    return { ...currentState, customerInfo: action.};
  })
);
