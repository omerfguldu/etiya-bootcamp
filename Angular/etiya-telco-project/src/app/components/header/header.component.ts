import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {
  faGear,
  faBell,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Token } from 'src/app/models/token';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  settingsIcon: IconDefinition = faGear;
  notificationsIcon: IconDefinition = faBell;
  activeUserName!: Token;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.activeUserName = this.authService.decodedToken;
  }

  logout() {
    this.authService.logout();
  }
}
