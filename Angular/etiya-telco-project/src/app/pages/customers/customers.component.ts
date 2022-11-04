import { Component, OnInit } from '@angular/core';
import { faPlus, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customer',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  plusIcon: IconDefinition = faPlus;
  constructor() {}

  ngOnInit(): void {}
}
