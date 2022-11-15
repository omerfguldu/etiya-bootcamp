import { AuthService } from './../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  faGear,
  faBell,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Token } from 'src/app/models/token';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  settingsIcon: IconDefinition = faGear;
  notificationsIcon: IconDefinition = faBell;

  activeUserName!: Token;
  isChecked: boolean = false;
  @Output() isSidebarActive = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private location: Location) {
    //* on mobile view if location changes close the sidebar
    this.location.onUrlChange(() => {
      this.isChecked = false;
      this.onInputChange();
    });
  }

  ngOnInit(): void {
    this.activeUserName = this.authService.decodedToken;
  }

  logout() {
    this.authService.logout();
  }

  onInputChange() {
    this.isSidebarActive.emit(this.isChecked);
  }
}
