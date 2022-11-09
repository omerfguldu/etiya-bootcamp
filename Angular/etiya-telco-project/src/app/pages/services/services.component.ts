import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IconDefinition,
  faPenToSquare,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Service } from 'src/app/models/service';
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
  isModal: boolean = false;
  isUpdate: boolean = false;
  displayStyle: string = 'none';
  addServiceForm!: FormGroup;
  selectedService: Service = {
    id: 0,
    name: '',
  };
  constructor(
    private servicesService: ServicesService,
    private formbuilder: FormBuilder,
    private customersService: CustomersService
  ) {}

  ngOnInit(): void {
    //* SERVISLERI GETIR VE SERVIS EKLEME FORMU OLUSTUR.
    this.customersService.deleteCustomerToRegisterModelStoreState();
    this.getServices();
    this.createAddServiceForm();
  }

  createAddServiceForm() {
    //* SERVIS EKLEME FORMU BUILDER
    this.addServiceForm = this.formbuilder.group({
      name: ['', Validators.required],
    });
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

  addService() {
    //* UPDATE YAPILACAKSA UPDATESERVICE METODUNU CAGIR.
    //* YENI SERVIS EKLENECEKSE ADDSERVICE METODUNU CAGIR.
    const service: Service = {
      ...this.addServiceForm.value,
    };
    if (this.isUpdate === true) {
      service.id = this.selectedService.id;
      this.servicesService.updateService(service).subscribe({
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.closePopup();
          this.getServices();
        },
      });
      return;
    }
    this.servicesService.addService(service).subscribe(() => {
      this.getServices();
      this.closePopup();
    });
  }

  deleteService(id: number) {
    //* SECILI SERVISI ID'YE GORE SIL
    this.servicesService.deleteService(id).subscribe(() => {
      this.getServices();
    });
  }

  updateService(service: Service) {
    //* UPDATE BUTONU TIKLANDIGINDA SERVIS BILGISINI
    //* FORM MODALI ACILDIGINDA OTOMATIK OLARAK GOSTER.
    this.isUpdate = true;
    this.openPopup();
    this.selectedService = service;
    this.addServiceForm.setValue({
      name: service.name,
    });
  }

  openPopup() {
    //* MODAL GOSTER
    this.displayStyle = 'block';
  }

  closePopup() {
    //* MODAL GIZLE
    this.displayStyle = 'none';
    this.isUpdate = false;
    this.addServiceForm.reset();
  }
}
