import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
import { Service } from 'src/app/models/service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-customer-services-form',
  templateUrl: './customer-services-form.component.html',
  styleUrls: ['./customer-services-form.component.css'],
})
export class CustomerServicesFormComponent implements OnInit, OnDestroy {
  subscription1!: Subscription;
  subscription2!: Subscription;
  services: Service[] = [];
  servicesSelectedStatus: boolean[] = [];
  selectedServices: Service[] = [];
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;

  constructor(
    private servicesService: ServicesService,
    private renderer: Renderer2,
    private customersService: CustomersService,
    private router: Router
  ) {
    console.log('kurucu calisti.');
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    //* SERVISLER GETIRME FONKSIYONUNU CAGIR.
    this.getServices();
    this.subscription1 = this.customerToRegisterModel$.subscribe({
      next: (res: any) => {
        if (res.services) {
          this.selectedServices = res.services;
        }
      },
      complete: () => {},
    });
  }

  onSubmit() {}

  fillServiceStatus() {
    //* SERVIS SECILI MI DEGIL MI ANLAMAK ICIN
    //* BASLANGIC DEGERI OLARAK GELEN SERVIS SAYISI KADAR FALSE EKLE.
    for (let i = 0; i < this.services.length; i++) {
      this.servicesSelectedStatus.push(false);
    }
  }

  getServices() {
    //* SERVISLERI CAGIR, CEVAP GELINCE FILLSERVICESTATUS CAGIR.
    this.servicesService.getServices().subscribe({
      next: (response) => {
        this.services = response;
        this.fillServiceStatus();
        if (this.selectedServices.length > 0) {
          this.selectedServices.forEach((service) => {
            this.servicesSelectedStatus[service.id - 1] = true;
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onServiceClick(service: Service, index: number, event: Event) {
    //* LISTELENE SERVISLERDEN BIRISINE TIKLANDIGINDA PARAMETRE OLARAK
    //* SECILI SERVISI GONDER. NGFORDAN GELEN INDEXI GONDER. EVENT'I GONDER.
    //* EGER SECILI SERVISE KARSILIK SERVISSTATUS DIZISINDEKI INDEX FALSE ISE
    //* BU SERVIS HENUZ SECILMEMISTIR. SERVISI SECILI HALE GETIR VE GEREKLI CSS SINIFINI EKLE
    //* SELECTEDSERVICES DIZISINE PUSHLA.
    //* ELSE TARAFINDA TAM TERSI ISLEMLERI GERCEKLESTIR.
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
    //* OVERVIEW EKRANINA GECMEK ISTENDIGINDE CALIS.
    //* STOREDA KAYITLI CUSTOMER VERISINI GETIR VE DEGISKENE AT.
    //* BU DEGISKENLE BIRLIKTE SECILI SERVISLER DIZISINI
    //* STORE'A KAYDET VE OVERVIEW'A YONLENDIR.
    this.subscription2 = this.customerToRegisterModel$.subscribe((res: any) => {
      // console.log('customer service next');
      // console.log(res);
      // if (res.customer) {
      //   this.customer = res.customer;
      //   return;
      // }
      this.customer = res;
    });
    console.log(this.customer);
    this.customersService.deleteCustomerToRegisterModelStoreState();
    this.customersService.setCustomerToRegisterModelStoreState({
      ...this.customer,
      services: this.selectedServices,
    });
    this.router.navigateByUrl('/homepage/newcustomer/overview');
  }

  onBack() {
    this.router.navigateByUrl('/homepage/newcustomer/info');
  }

  ngOnDestroy(): void {
    // this.subscription1.unsubscribe();
    // this.subscription2.unsubscribe();
  }
}
