import { Customer } from 'src/app/models/customer';
import { Component, Input, OnInit } from '@angular/core';
import {
  faBuilding,
  faFileSignature,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.css'],
})
export class CorporateDetailsComponent implements OnInit {
  companyIcon: IconDefinition = faBuilding;
  taxIcon: IconDefinition = faFileSignature;
  @Input() selectedUserID!: number;
  corporateCustomerDetails!: CorporateCustomer[];
  customerNumber!: number;

  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.getCorporateCustomer(this.selectedUserID);
    this.customersService
      .getCustomer(this.selectedUserID)
      .subscribe((res: Customer) => {
        this.customerNumber = res.customerNumber;
      });
  }

  getCorporateCustomer(id: number) {
    //* get corporateCustomer values with id
    this.customersService
      .getCorporateCustomer(id)
      .subscribe((res: CorporateCustomer[]) => {
        this.corporateCustomerDetails = res;
      });
  }
}
