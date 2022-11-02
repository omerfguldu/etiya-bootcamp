import { HttpClient } from '@angular/common/http';
import { Token } from './../../models/token';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  tokenValue!: Token;
  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.tokenValue = this.authService.decodedToken;
    this.getServices();
  }

  getServices() {
    this.http.get('http://localhost:3000/services').subscribe((res) => {
      console.log(res);
    });
  }
}
