import { Router } from '@angular/router';
import { LocalstorageService } from './../../services/localstorage.service';
import { Component, OnInit } from '@angular/core';
import {
  faGear,
  faBell,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  settingsIcon: IconDefinition = faGear;
  notificationsIcon: IconDefinition = faBell;
  constructor(
    private localstorageService: LocalstorageService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  logout() {
    this.localstorageService.deleteItem();
    this.router.navigateByUrl('login');
  }
}
