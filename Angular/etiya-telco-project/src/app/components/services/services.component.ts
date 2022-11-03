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
        console.log(response);
        this.services = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {},
    });
  }
  addService() {
    const service: Service = {
      ...this.addServiceForm.value,
    };
    if (this.isUpdate === true) {
      service.id = this.selectedService.id;
      this.servicesService.updateService(service).subscribe({
        next: (res) => {
          console.log(res);
        },
        complete: () => {
          this.closePopup();
          this.getServices();
        },
      });
      return;
    }
    this.servicesService.addService(service).subscribe((res) => {
      console.log(res);
      this.getServices();
      this.closePopup();
    });
  }
  deleteService(id: number) {
    console.log(id);
    this.servicesService.deleteService(id).subscribe((res) => {
      console.log(res);
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
