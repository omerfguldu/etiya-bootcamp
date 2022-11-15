import { CorporateCustomer } from './../../../models/corporateCustomer';
import { IndividualCustomer } from './../../../models/individualCustomer';
import { Router } from '@angular/router';
import { CustomersService } from 'src/app/services/customers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';

@Component({
  selector: 'app-customer-info-form',
  templateUrl: './customer-info-form.component.html',
  styleUrls: ['./customer-info-form.component.css'],
})
export class CustomerInfoFormComponent implements OnInit, OnDestroy {
  //* BASLANGICTA CUSTOMER TYPE INDIVIDUAL OLARAK BELIRLE.
  customerType: string = 'Individual Customer';
  customerInfoSubs: Subscription[] = [];
  customerValues!: IndividualCustomer | CorporateCustomer | null;
  customerInfoForm!: FormGroup;
  newCustomerInfo$: Observable<IndividualCustomer | CorporateCustomer | null>;

  dateOfToday = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private customersService: CustomersService,
    private router: Router,
    private store: Store<AppStoreState>
  ) {
    this.newCustomerInfo$ = this.store.select((s) => s.newCustomer.info);
  }

  ngOnInit(): void {
    this.createCustomerInfoForm();
  }

  onCustomerTypeChange(type: string) {
    //* CUSTOMER TYPE SECIMI YAPILAN INPUT HER DEGISTIGINDE YENI FORM OLUSTUR.
    this.customersService.deleteNewCustomerInfoStoreState();
    this.customerType = type;
    this.createCustomerInfoForm();
  }

  onSubmit() {
    //* FORMA GIRILEN BILGILERI STORE'A KAYDET VE SERVIS SECIM EKRANINA YONLENDIR.
    this.customersService.setNewCustomerInfoStoreState({
      ...this.customerInfoForm.value,
    });
    this.router.navigateByUrl('homepage/newcustomer/services');
  }

  createCustomerInfoForm() {
    //* CUSTOMER TYPE'A GORE FORM BUILDER ILE FORM OLUSTUR.
    //* EGER STORE'DA KAYITLI VERI VARSA ILK OLARAK O DEGERLERI FORMDA GOSTER.
    this.customerInfoSubs.push(
      this.newCustomerInfo$.subscribe({
        next: (res: IndividualCustomer | CorporateCustomer | null) => {
          this.customerValues = res;
        },
        complete: () => {},
      })
    );
    if (this.customerValues) {
      this.customerType = (this.customerValues as IndividualCustomer).firstName
        ? 'Individual Customer'
        : 'Corporate Customer';
    }
    if (this.customerType === 'Individual Customer') {
      this.customerInfoForm = this.fb.group({
        firstName: [
          (this.customerValues as IndividualCustomer)?.firstName || '',
          Validators.required,
        ],
        lastName: [
          (this.customerValues as IndividualCustomer)?.lastName || '',
          Validators.required,
        ],
        nationalIdentity: [
          (this.customerValues as IndividualCustomer)?.nationalIdentity || '',
          Validators.required,
        ],
        dateOfBirth: [
          (this.customerValues as IndividualCustomer)?.dateOfBirth || '',
          Validators.required,
        ],
      });
    } else {
      this.customerInfoForm = this.fb.group({
        companyName: [
          (this.customerValues as CorporateCustomer)?.companyName || '',
          Validators.required,
        ],
        taxNumber: [
          (this.customerValues as CorporateCustomer)?.taxNumber || '',
          Validators.required,
        ],
      });
    }
  }

  onReset() {
    this.customerInfoForm.reset();
  }

  ngOnDestroy(): void {
    this.customerInfoSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
