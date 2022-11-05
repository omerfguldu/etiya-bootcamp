import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overlay-title',
  templateUrl: './overlay-title.component.html',
  styleUrls: ['./overlay-title.component.css'],
})
export class OverlayTitleComponent implements OnInit {
  @Input() text!: string;

  //* undefined: bir seyin tanimli olmadigini gosterir.
  //* null: programci tarafindan verilen bir degerdir. Dolayisiyla JS null degerini ayri bir tip olarak ele alir.
  constructor() {}

  ngOnInit(): void {}
}
