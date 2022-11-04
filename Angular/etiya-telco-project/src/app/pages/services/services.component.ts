import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  IconDefinition,
  faPenToSquare,
  faTrash,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Service } from 'src/app/models/service';
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
  services: Service[] = [];
  isModal: boolean = false;
  isUpdate: boolean = false;
  addServiceForm!: FormGroup;
  selectedService: Service = {
    id: 0,
    name: '',
  };
  constructor(
    private servicesService: ServicesService,
    private formbuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getServices();
    this.createAddServiceForm();
  }
  createAddServiceForm() {
    this.addServiceForm = this.formbuilder.group({
      name: ['', Validators.required],
    });
  }
  getServices() {
    this.servicesService.getServices().subscribe({
      next: (response) => {
        this.services = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addService() {
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
    this.servicesService.deleteService(id).subscribe(() => {
      this.getServices();
    });
  }
  updateService(service: Service) {
    this.isUpdate = true;
    this.openPopup();
    this.selectedService = service;
    this.addServiceForm.setValue({
      name: service.name,
    });
  }

  displayStyle = 'none';

  openPopup() {
    this.displayStyle = 'block';
  }
  closePopup() {
    this.displayStyle = 'none';
    this.isUpdate = false;
    this.addServiceForm.reset();
  }
}
