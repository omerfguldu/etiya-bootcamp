import { Token } from './../../models/token';
import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  // tokenValues!: Token;
  tokenValue!: Token;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('home calisti');
    this.tokenValue = this.authService.decodedToken;
    // this.subscribeToTokenValue();
  }

  // subscribeToTokenValue() {
  //   this.authService.deneme.subscribe((value) => {
  //     this.tokenValue = value;
  //   });
  // }
}
