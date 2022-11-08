import { Component, Input, OnInit } from '@angular/core';
import { CorporateCustomer } from 'src/app/models/corporateCustomer';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';

@Component({
  selector: 'app-corporate-details',
  templateUrl: './corporate-details.component.html',
  styleUrls: ['./corporate-details.component.css'],
})
export class CorporateDetailsComponent implements OnInit {
  @Input() selectedUserID!: number;

  corporateCustomerDetails!: CorporateCustomer[];
  constructor(private customersService: CustomersService) {}

  ngOnInit(): void {
    this.getCorporateCustomer(this.selectedUserID);
  }
  getCorporateCustomer(id: number) {
    //* CUSTOMER ID YE AIT BILGILERI CORPRATE CUSTOMERS UZERINDEN GETIR
    this.customersService.getCorporateCustomer(id).subscribe((res) => {
      this.corporateCustomerDetails = res;
    });
  }
}
