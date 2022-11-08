import { CustomerInfoModel } from './../../models/customerInfoModel';
import { createAction, props } from '@ngrx/store';

export const setCustomerInfoModel = createAction(
  '[Customer] Set Customer Info',
  props<{ customerInfoModel: CustomerInfoModel }>
);
