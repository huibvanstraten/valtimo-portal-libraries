import {Component, Input, OnInit} from '@angular/core';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';

@Component({
  selector: 'nl-material-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() items!: Array<NavigationMenuItem>;

  items$!: Observable<Array<NavigationMenuItem>>;

  open$!: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.sidenavService.items = this.items;
    this.items$ = this.sidenavService.items$;
  }

  onOpenedChange(opened: boolean = false): void {
    this.sidenavService.open = opened;
  }
}
