import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  IconDefinition,
  faPenToSquare,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Catalog } from 'src/app/models/catalog';
import { Service } from 'src/app/models/service';
import { ServiceDto } from 'src/app/models/serviceDto';
import { CatalogsService } from 'src/app/services/catalogs.service';
import { CustomersService } from 'src/app/services/customers.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css'],
})
export class ServicesComponent implements OnInit {
  updateIcon: IconDefinition = faPenToSquare;
  deleteIcon: IconDefinition = faTrash;
  plusIcon: IconDefinition = faPlus;
  searchName: string = '';
  services: Service[] = [];
  deleteId: number = 0;
  isModal: boolean = false;
  isUpdate: boolean = false;
  addServiceForm!: FormGroup;
  catalogsForm!: FormGroup;
  selectedService: Service = {
    id: 0,
    name: '',
  };
  selectedCatalogs: Catalog[] = [];
  constructor(
    private servicesService: ServicesService,
    private formbuilder: FormBuilder,
    private customersService: CustomersService,
    private catalogsService: CatalogsService
  ) {}

  ngOnInit(): void {
    //* SERVISLERI GETIR VE SERVIS EKLEME FORMU OLUSTUR.
    this.customersService.deleteCustomerToRegisterModelStoreState();
    this.getServices();
    this.createAddServiceForm();
  }
  get catalogs() {
    return this.addServiceForm.get('catalogs ') as FormArray;
  }
  // group({
  //   catalogName: ['', Validators.required],
  //   price: ['', Validators.required],
  // }),
  createAddServiceForm(service?: Service) {
    let catalogs = new FormArray([]);
    if (service === undefined) {
      this.addServiceForm = this.formbuilder.group({
        name: ['', Validators.required],
        catalogs,
      });
      return;
    }

    this.catalogsService
      .getCatalogsByServiceId(service.id)
      .subscribe((response) => {
        this.selectedCatalogs = response;
        this.selectedCatalogs.forEach((catalog) => {
          (<FormArray>this.addServiceForm.get('catalogs')).push(
            new FormGroup({
              id: new FormControl(catalog.id),
              name: new FormControl(catalog.name, Validators.required),
              price: new FormControl(catalog.price, [Validators.required]),
            })
          );
        });
      });

    //* SERVIS EKLEME FORMU BUILDER
    this.addServiceForm = this.formbuilder.group({
      name: [service?.name ?? '', Validators.required],
      catalogs,
    });
  }
  addCatalog() {
    this.catalogs.push(this.formbuilder.control(''));
  }

  getServices() {
    //* SERVISLERI GETIR VE ILGILI DEGISKENE AKTAR.
    this.servicesService.getServices().subscribe({
      next: (response) => {
        this.services = response;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  get controls() {
    return (<FormArray>this.addServiceForm.get('catalogs')).controls;
  }

  onDeleteCatalog(index: number) {
    (<FormArray>this.addServiceForm.get('catalogs')).removeAt(index);
  }

  onAddCatalog() {
    (<FormArray>this.addServiceForm.get('catalogs')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        price: new FormControl(null, [Validators.required]),
      })
    );
  }

  addService() {
    //* UPDATE YAPILACAKSA UPDATESERVICE METODUNU CAGIR.
    //* YENI SERVIS EKLENECEKSE ADDSERVICE METODUNU CAGIR.
    console.log(this.addServiceForm.value);

    const service: ServiceDto = {
      name: this.addServiceForm.value.name,
    };
    const catalogs: Catalog[] = this.addServiceForm.value.catalogs;

    if (this.isUpdate === true) {
      const updateService: Service = {
        ...this.selectedService,
      };

      this.servicesService.updateService(updateService).subscribe({
        next: (response) => {
          catalogs.forEach((catalog) => {
            catalog.serviceId = response.id;
            console.log(catalog);

            this.catalogsService
              .updateCatalog(catalog)
              .subscribe((response) => {
                {
                }
              });
          });
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.closePopup();
          this.getServices();
        },
      });
      return;
    } //TODO UPDATE CATALOGS
    this.servicesService.addService(service).subscribe((response) => {
      this.getServices();

      catalogs.forEach((catalog) => {
        catalog.serviceId = response.id;

        this.catalogsService.addCatalog(catalog).subscribe((response) => {
          {
          }
        });
      });
      this.closePopup();
    });
  }

  //   //* ACILAN MODAL'DA DELETE SECILIRSE SERVISI SIL
  deleteService() {
    this.servicesService.deleteService(this.deleteId).subscribe(() => {
      this.catalogsService
        .getCatalogsByServiceId(this.deleteId)
        .subscribe((response) => {
          response.forEach((catalog) => {
            this.catalogsService.deleteCatalog(catalog.id).subscribe(() => {});
          });
        });
      this.getServices();
    });
  }

  updateService(service: Service) {
    //* UPDATE BUTONU TIKLANDIGINDA SERVIS BILGISINI
    //* FORM MODALI ACILDIGINDA OTOMATIK OLARAK GOSTER.
    this.isUpdate = true;
    this.selectedService = service;
    let selectedCatalogs: Catalog[] = [];

    this.createAddServiceForm(service);
    // this.addServiceForm.setValue({
    //   name: service.name,
    //   catalogs: selectedCatalogs, //TODO get catalogs with service id and add them to this field
    // });
  }

  closePopup() {
    this.isUpdate = false;
    this.addServiceForm.reset();
  }
}
