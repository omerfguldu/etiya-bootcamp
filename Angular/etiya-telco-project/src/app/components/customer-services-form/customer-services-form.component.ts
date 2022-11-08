import { Router } from '@angular/router';
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
    private customersService: CustomersService,
    private router: Router
  ) {
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    //* SERVISLER GETIRME FONKSIYONUNU CAGIR.
    this.getServices();
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
    this.customerToRegisterModel$.subscribe((res) => {
      this.customer = res;
    });
    this.customerAndServices.customer = this.customer;
    this.customerAndServices.services = this.selectedServices;
    this.customersService.setCustomerToRegisterModelStoreState(
      this.customerAndServices
    );
    this.router.navigateByUrl('/homepage/newcustomer/overview');
  }
}
