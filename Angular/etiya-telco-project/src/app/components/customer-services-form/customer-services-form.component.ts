import { Component, OnInit, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
import { Service } from 'src/app/models/service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-customer-services-form',
  templateUrl: './customer-services-form.component.html',
  styleUrls: ['./customer-services-form.component.css'],
})
export class CustomerServicesFormComponent implements OnInit {
  services: Service[] = [];
  servicesSelectedStatus: boolean[] = [];
  selectedServices: Service[] = [];
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;
  customerAndServices: CustomerToRegisterModel = {
    customer: null,
    services: [],
  };

  constructor(
    private servicesService: ServicesService,
    private renderer: Renderer2,
    private customersService: CustomersService
  ) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.getServices();
  }

  onSubmit() {}

  fillServiceStatus() {
    for (let i = 0; i < this.services.length; i++) {
      this.servicesSelectedStatus.push(false);
    }
  }

  getServices() {
    this.servicesService.getServices().subscribe({
      next: (response) => {
        this.services = response;
        this.fillServiceStatus();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onServiceClick(service: Service, index: number, event: Event) {
    if (this.servicesSelectedStatus[index] === false) {
      this.servicesSelectedStatus[index] = true;
      this.renderer.addClass(event.target, 'selected');
      this.selectedServices.push(this.services[index]);
    } else {
      this.servicesSelectedStatus[index] = false;
      this.renderer.removeClass(event.target, 'selected');
      this.selectedServices = this.selectedServices.filter(
        (srv) => srv.id !== service.id
      );
    }
  }

  onNext() {
    console.log(this.selectedServices);
    this.customerToRegisterModel$.subscribe((res) => {
      this.customer = res;
    });
    this.customerAndServices.customer = this.customer;
    this.customerAndServices.services = this.selectedServices;
    this.customersService.setCustomerToRegisterModelStoreState(
      this.customerAndServices
    );
    this.customersService.customerToRegisterModel$.subscribe((res) => {
      console.log(res);
    });
  }
}
