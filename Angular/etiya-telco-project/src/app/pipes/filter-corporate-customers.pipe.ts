import { Pipe, PipeTransform } from '@angular/core';
import { CorporateCustomer } from '../models/corporateCustomer';

@Pipe({
  name: 'filterCorporateCustomers',
})
export class FilterCorporateCustomersPipe implements PipeTransform {
  transform(value: CorporateCustomer[], ...args: any[]): CorporateCustomer[] {
    return value?.filter((customer: CorporateCustomer) => {
      return (
        customer.customerId.toString().includes(args[0]) &&
        customer.companyName
          .toLocaleLowerCase()
          .includes(args[1].toLocaleLowerCase()) &&
        customer.taxNumber.toString().includes(args[2])
      );
    });
  }
}
