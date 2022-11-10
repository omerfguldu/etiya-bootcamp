import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Renderer2,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CustomerToRegisterModel } from 'src/app/models/customerToRegisterModel';
import { Service } from 'src/app/models/service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { Catalog } from 'src/app/models/catalog';
import { Store } from '@ngrx/store';
import { AppStoreState } from 'src/app/store/app.state';
import { addCatalogsToCatalogsRegisterModel } from 'src/app/store/catalogsToRegister/catalogsToRegister.actions';

@Component({
  selector: 'app-customer-services-form',
  templateUrl: './customer-services-form.component.html',
  styleUrls: ['./customer-services-form.component.css'],
})
export class CustomerServicesFormComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  services: Service[] = [];
  servicesSelectedStatus: boolean[] = [];
  selectedServices: Service[] = [];
  customerToRegisterModel$: Observable<CustomerToRegisterModel | null>;
  customer: any;
  catalogs: Catalog[] = []; //tüm kataloglar veri tabanından çekilip bu değişkene atanacak
  catalogsStore$!: Observable<Catalog[] | null>;
  selectedCatalogs: Catalog[] = [];
  // productType: string = 'Catalogs';
  // toggleProductType: boolean = true;
  //True ise Services False ise Catalogs
  constructor(
    private servicesService: ServicesService,
    private renderer: Renderer2,
    private customersService: CustomersService,
    private catalogsService: CatalogsService,
    private router: Router,
    private store: Store<AppStoreState>
  ) {
    this.catalogsStore$ = this.store.select(
      (s) => s.catalogsToRegister.catalogsToRegister
    );
    this.customerToRegisterModel$ =
      this.customersService.customerToRegisterModel$;
  }

  ngOnInit(): void {
    this.catalogsStore$.subscribe((response) => {
      console.log(response);

      if (response != null) this.selectedCatalogs = response;
    });

    //* SERVISLER GETIRME FONKSIYONUNU CAGIR.
    // this.getServices();
    this.getCatalogs();

    this.subscriptions.push(
      this.customerToRegisterModel$.subscribe({
        next: (res: any) => {
          if (res.services) {
            const { services, ...customer } = res;
            this.customer = customer;
            this.selectedServices = services;
            return;
          }
          this.customer = res;
        },
        complete: () => {},
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

    // for (let i = 0; i < this.services.length; i++) {
    //   this.servicesSelectedStatus[i] = false;
    // }
  }
  getCatalogs() {
    this.catalogsService.getCatalogs().subscribe({
      next: (response) => {
        this.catalogs = response;
      },
    });
  }

  // getServices() {
  //   //* SERVISLERI CAGIR, CEVAP GELINCE FILLSERVICESTATUS CAGIR.
  //   this.servicesService.getServices().subscribe({
  //     next: (response) => {
  //       this.services = response;
  //       this.fillServiceStatus();
  //       if (this.selectedServices.length > 0) {
  //         this.selectedServices.forEach((service) => {
  //           this.servicesSelectedStatus[service.id] = true;
  //         });
  //       }
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  onCatalogClick(catalog: Catalog) {
    let removeSelectedCatalog = this.selectedCatalogs.some(
      (selectedCatalog) => {
        return selectedCatalog.id === catalog.id;
      }
    ); //Check if the selected catalog already exists if it exists remove it with filter method and return
    if (removeSelectedCatalog) {
      this.selectedCatalogs = this.selectedCatalogs.filter(
        (selectedCatalog) => {
          return selectedCatalog.id !== catalog.id;
        }
      );
      return;
    }
    this.selectedCatalogs = [...this.selectedCatalogs, catalog];
  }
  toggleCatalogCss(catalog: Catalog) {
    return this.selectedCatalogs.some((selectedCatalog) => {
      return selectedCatalog.id === catalog.id;
    });
  }

  // onServiceClick(service: Service, index: number, event: Event) {
  //   //* LISTELENE SERVISLERDEN BIRISINE TIKLANDIGINDA PARAMETRE OLARAK
  //   //* SECILI SERVISI GONDER. NGFORDAN GELEN INDEXI GONDER. EVENT'I GONDER.
  //   //* EGER SECILI SERVISE KARSILIK SERVISSTATUS DIZISINDEKI INDEX FALSE ISE
  //   //* BU SERVIS HENUZ SECILMEMISTIR. SERVISI SECILI HALE GETIR VE GEREKLI CSS SINIFINI EKLE
  //   //* SELECTEDSERVICES DIZISINE PUSHLA.
  //   //* ELSE TARAFINDA TAM TERSI ISLEMLERI GERCEKLESTIR.
  //   if (this.servicesSelectedStatus[service.id] === false) {
  //     this.servicesSelectedStatus[service.id] = true;
  //     this.renderer.addClass(event.target, 'selected');
  //     this.selectedServices = [...this.selectedServices, this.services[index]];
  //   } else {
  //     this.servicesSelectedStatus[service.id] = false;
  //     this.renderer.removeClass(event.target, 'selected');
  //     this.selectedServices = this.selectedServices.filter(
  //       (srv) => srv.id !== service.id
  //     );
  //   }
  // }

  onNext() {
    //* OVERVIEW EKRANINA GECMEK ISTENDIGINDE CALIS.
    //* STOREDA KAYITLI CUSTOMER VERISINI GETIR VE DEGISKENE AT.
    //* BU DEGISKENLE BIRLIKTE SECILI SERVISLER DIZISINI
    //* STORE'A KAYDET VE OVERVIEW'A YONLENDIR.
    this.customersService.setCustomerToRegisterModelStoreState({
      ...this.customer,
      services: this.selectedServices,
    });
    this.store.dispatch(
      addCatalogsToCatalogsRegisterModel({
        catalogsToRegister: this.selectedCatalogs,
      })
    );
    this.router.navigateByUrl('/homepage/newcustomer/overview');
  }

  onBack() {
    this.customersService.setCustomerToRegisterModelStoreState({
      ...this.customer,
      services: this.selectedServices,
    });
    this.store.dispatch(
      addCatalogsToCatalogsRegisterModel({
        catalogsToRegister: this.selectedCatalogs,
      })
    );
    this.router.navigateByUrl('/homepage/newcustomer/info');
  }

  onReset() {
    this.selectedServices = [];
    this.fillServiceStatus();
  }

  // onProductTypeChange(type: string) {
  //   //* CUSTOMER TYPE SECIMI YAPILAN INPUT HER DEGISTIGINDE YENI FORM OLUSTUR.
  //   this.toggleProductType = !this.toggleProductType;
  //   this.productType = type;
  // }
  ngOnDestroy(): void {
    this.subscriptions.map((sub) => {
      sub.unsubscribe();
    });
  }
}
