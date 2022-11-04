import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer';

@Pipe({
  name: 'filterCustomers',
})
export class FilterCustomersPipe implements PipeTransform {
  transform(value: Customer[], ...args: any[]): Customer[] {
    return value?.filter((customer: Customer) => {
      const [day, month, year] = customer.dateOfBirth.split('.');
      let date = new Date(+year, +month - 1, +day);
      return (
        customer.firstName
          .toLocaleLowerCase()
          .includes(args[0].toLocaleLowerCase()) &&
        customer.lastName
          .toLocaleLowerCase()
          .includes(args[1].toLocaleLowerCase()) &&
        date > new Date(args[2])
      );
    });
  }
}
/* .filter((customer) => {
        return customer.lastName
          .toLocaleLowerCase()
          .includes(args[1].toLocaleLowerCase());
      }); */
