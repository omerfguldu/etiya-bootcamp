import { ToastrService } from 'ngx-toastr';
import { Catalog } from 'src/app/models/catalog';
import { AppStoreState } from './../../../store/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Service } from 'src/app/models/service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-customer-services-form',
  templateUrl: './customer-services-form.component.html',
  styleUrls: ['./customer-services-form.component.css'],
})
export class CustomerServicesFormComponent implements OnInit, OnDestroy {
  customerServicesSubs: Subscription[] = [];
  services: Service[] = [];
  servicesSelectedStatus: boolean[] = [];
  selectedServices!: Service[];
  newCustomerServices$!: Observable<Service[] | null>;
  newCustomerCatalogs$!: Observable<Catalog[] | null>;
  newCatalogs: Catalog[] = [];
  constructor(
    private servicesService: ServicesService,
    private renderer: Renderer2,
    private store: Store<AppStoreState>,
    private customersService: CustomersService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.newCustomerServices$ = this.store.select(
      (s) => s.newCustomer.services
    );
    this.newCustomerCatalogs$ = this.store.select(
      (s) => s.newCustomer.catalogs
    );
  }

  ngOnInit(): void {
    //* SERVISLER GETIRME FONKSIYONUNU CAGIR.
    this.getServices();
    this.customerServicesSubs.push(
      this.newCustomerServices$.subscribe({
        next: (res: Service[] | null) => {
          res ? (this.selectedServices = res) : (this.selectedServices = []);
        },
      })
    );
  }

  onSubmit() {}

  fillServiceStatus() {
    //* SERVIS SECILI MI DEGIL MI ANLAMAK ICIN
    //* BASLANGIC DEGERI OLARAK GELEN SERVIS SAYISI KADAR FALSE EKLE.
    this.services.forEach((service) => {
      this.servicesSelectedStatus[service.id] = false;
    });
  }

  getServices() {
    //* SERVISLERI CAGIR, CEVAP GELINCE FILLSERVICESTATUS CAGIR.

    this.servicesService.getServices().subscribe({
      next: (response: Service[]) => {
        this.services = response;
        this.fillServiceStatus();
        if (this.selectedServices.length > 0) {
          this.selectedServices.forEach((service) => {
            this.servicesSelectedStatus[service.id] = true;
          });
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
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
    if (this.servicesSelectedStatus[service.id] === false) {
      this.servicesSelectedStatus[service.id] = true;
      this.renderer.addClass(event.target, 'selected');
      this.selectedServices = [...this.selectedServices, this.services[index]];
    } else {
      this.servicesSelectedStatus[service.id] = false;
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
    this.customersService.setNewCustomerServicesStoreState(
      this.selectedServices
    );
    this.customerServicesSubs.push(
      this.newCustomerCatalogs$.subscribe((res: Catalog[] | null) => {
        if (res && res.length > 0) {
          this.newCatalogs = res;
          this.newCatalogs = this.newCatalogs.filter((newctlg: any) => {
            return this.selectedServices.some((srv) => {
              if (srv.id === newctlg.serviceId) return newctlg;
            });
          });
        }
      })
    );

    this.customersService.setNewCustomerCatalogsStoreState(this.newCatalogs);
    this.router.navigateByUrl('/homepage/newcustomer/catalogs');
  }

  onBack() {
    this.customersService.setNewCustomerServicesStoreState(
      this.selectedServices
    );
    this.router.navigateByUrl('/homepage/newcustomer/info');
  }

  onReset() {
    this.selectedServices = [];
    this.fillServiceStatus();
  }

  ngOnDestroy(): void {
    this.customerServicesSubs.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
