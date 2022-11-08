import { CustomerInfoModel } from './../../models/customerInfoModel';

export interface CustomerState {
  customerInfo: CustomerInfoModel | null;
}

export const initialCustomerState: CustomerState = {
  customerInfo: null,
};
