import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
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
  selectedService: Service = {
    id: 0,
    name: '',
  };
  selectedCatalogs: Catalog[] = [];
  removedCatalogs: Catalog[] = [];

  constructor(
    private servicesService: ServicesService,
    private formbuilder: FormBuilder,
    private customersService: CustomersService,
    private catalogsService: CatalogsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customersService.deleteNewCustomerStoreStates();
    this.getServices();
    this.createAddServiceForm();
  }

  //* get catalogs inside the form array
  get catalogs() {
    return this.addServiceForm.get('catalogs ') as FormArray;
  }

  createAddServiceForm(service?: Service) {
    let catalogs = new FormArray([]);
    //* if service parameter is undefined create form for add new service
    if (service === undefined) {
      this.addServiceForm = this.formbuilder.group({
        name: ['', Validators.required],
        catalogs,
      });
      return;
    }

    //* if there is service create catalog side of the form with service's catalogs
    this.catalogsService
      .getCatalogsByServiceId(service.id)
      .subscribe((res: Catalog[]) => {
        this.selectedCatalogs = res;
        this.selectedCatalogs.forEach((catalog) => {
          (<FormArray>this.addServiceForm.get('catalogs')).push(
            new FormGroup({
              id: new FormControl(catalog.id),
              name: new FormControl(catalog.name, Validators.required),
              duration: new FormControl(catalog.duration, Validators.required),
              price: new FormControl(catalog.price, [Validators.required]),
            })
          );
        });
      });

    //* if there is service create service side of the form with service's values
    this.addServiceForm = this.formbuilder.group({
      name: [service?.name ?? '', Validators.required],
      catalogs,
    });
  }

  addCatalog() {
    this.catalogs.push(this.formbuilder.control(''));
  }

  getServices() {
    //* get all services
    this.servicesService.getServices().subscribe({
      next: (res: Service[]) => {
        this.services = res;
      },
      error: (err) => this.toastr.error(err.message),
    });
  }

  get controls() {
    //* get catalog controls array
    return (<FormArray>this.addServiceForm.get('catalogs')).controls;
  }

  onDeleteCatalog(control: AbstractControl, index: number) {
    //* add removed catalog to an array and remove from form array
    this.removedCatalogs.push(control.value);
    (<FormArray>this.addServiceForm.get('catalogs')).removeAt(index);
  }

  onAddCatalog() {
    //* add new catalog to form array
    (<FormArray>this.addServiceForm.get('catalogs')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        duration: new FormControl(null, Validators.required),
        price: new FormControl(null, [Validators.required]),
      })
    );
  }

  onNewService() {
    this.createAddServiceForm();
  }

  addService() {
    //* get service name from form
    const service: ServiceDto = {
      name: this.addServiceForm.value.name,
    };
    //* get catalogs from form
    const catalogs: Catalog[] = this.addServiceForm.value.catalogs;

    //* if button works for update service
    if (this.isUpdate === true) {
      //* map removedCatalogs array. if there is a catalog in array, remove it from database
      this.removedCatalogs.forEach((ctlg) => {
        if (ctlg.id) {
          this.catalogsService.deleteCatalog(ctlg.id).subscribe();
        }
      });

      //* store new service values in a variable
      const updateService: Service = {
        ...this.selectedService,
        name: this.addServiceForm.value.name,
      };

      //* update service and catalog with new value
      this.servicesService.updateService(updateService).subscribe({
        next: (res: Service) => {
          catalogs.forEach((catalog) => {
            catalog.serviceId = res.id;
            if (!catalog.id) {
              this.catalogsService
                .addCatalog(catalog)
                .subscribe((res: Catalog) => {
                  this.catalogsService.updateCatalog(res).subscribe();
                });
              return;
            }
            this.catalogsService.updateCatalog(catalog).subscribe();
          });
        },
        error: (err) => {
          this.toastr.error(err.message);
        },
        complete: () => {
          this.closePopup();
          this.getServices();
        },
      });
      return;
    }

    //* if button works for add new service
    //* add new service to database
    this.servicesService.addService(service).subscribe((res: Service) => {
      this.getServices();
      //* add catalogs to database
      catalogs.forEach((catalog) => {
        catalog.serviceId = res.id;
        this.catalogsService.addCatalog(catalog).subscribe();
      });
      this.closePopup();
    });
  }

  //* delete selected service and relative catalogs from database
  deleteService() {
    this.servicesService.deleteService(this.deleteId).subscribe(() => {
      this.catalogsService
        .getCatalogsByServiceId(this.deleteId)
        .subscribe((res: Service[]) => {
          res.forEach((catalog) => {
            this.catalogsService.deleteCatalog(catalog.id).subscribe(() => {});
          });
        });
      this.getServices();
    });
  }

  updateService(service: Service) {
    this.isUpdate = true;
    this.selectedService = service;
    this.createAddServiceForm(service);
  }

  closePopup() {
    this.isUpdate = false;
    this.removedCatalogs = [];
    this.addServiceForm.reset();
  }
}
