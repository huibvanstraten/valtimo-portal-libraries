import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'nl-material-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss']
})
export class HeaderLogoComponent implements OnInit {
  @Input() logoImagePath!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
