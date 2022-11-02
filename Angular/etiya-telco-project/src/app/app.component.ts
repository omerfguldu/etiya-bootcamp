import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
      return;
    }
    this.router.navigateByUrl('homepage');
  }
}
