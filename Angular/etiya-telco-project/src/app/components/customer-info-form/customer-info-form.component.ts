import { CustomerToRegisterModel } from './../../models/customerToRegisterModel';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.css'],
})
export class CustomerInfoFormComponent implements OnInit {
  customerType: string = 'Individual Customer';
  customerInfoForm!: FormGroup;
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private router: Router
  ) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.createCustomerInfoForm();
  }

  onCustomerTypeChange(type: string) {
    this.customerType = type;
    this.createCustomerInfoForm();
  }

  onSubmit() {
    this.customersService.setCustomerToRegisterModelStoreState(
      this.customerInfoForm.value
    );
    this.customerToRegisterModel$.subscribe((res) => {
      console.log(res);
    });
    this.router.navigateByUrl('homepage/newcustomer/services');
  }

  createCustomerInfoForm() {
    if (this.customerType === 'Individual Customer') {
      this.customerInfoForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        nationalIdentity: ['', Validators.required],
        dateOfBirth: ['', Validators.required],
      });
    } else {
      this.customerInfoForm = this.fb.group({
        companyName: ['', Validators.required],
        taxNumber: ['', Validators.required],
      });
    }
  }
}
