import {Component, Input, OnInit} from '@angular/core';
import {NavigationMenuItem} from '../../interfaces';

@Component({
  selector: 'nl-material-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit {

  @Input() items: Array<NavigationMenuItem> = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
