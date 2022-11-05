import { Component, OnInit } from '@angular/core';
import {
  faEye,
  faGears,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css'],
})
export class NewCustomerComponent implements OnInit {
  userIcon: IconDefinition = faUser;
  servicesIcon: IconDefinition = faGears;
  overviewIcon: IconDefinition = faEye;

  constructor() {}

  ngOnInit(): void {}
}
