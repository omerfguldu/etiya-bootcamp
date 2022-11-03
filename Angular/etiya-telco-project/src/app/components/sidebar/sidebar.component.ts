import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  IconDefinition,
  faRightFromBracket,
  faGears,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  logoutIcon: IconDefinition = faRightFromBracket;
  servicesIcon: IconDefinition = faGears;
  customersIcon: IconDefinition = faUsers;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}
