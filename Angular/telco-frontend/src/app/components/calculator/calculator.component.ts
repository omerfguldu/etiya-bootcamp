import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
})
export class CalculatorComponent implements OnInit {
  //* constructor ngoninit ten once calisir.
  constructor() {
    console.log('calculator constructor');
  }

  //* component initialize edildiginde calisir...
  ngOnInit(): void {
    console.log('calculator ngoninit');
  }
}
