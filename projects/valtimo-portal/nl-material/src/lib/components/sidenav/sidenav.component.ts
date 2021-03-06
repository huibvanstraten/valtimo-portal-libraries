import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'nl-material-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  @Input() items!: Array<NavigationMenuItem>;

  open$!: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.sidenavService.items = this.items;
  }

  onOpenedChange(opened: boolean = false): void {
    this.sidenavService.open = opened;
  }

  ngAfterViewInit(): void {
    this.sidenavService.sidenavWidth = this.sidenav._getWidth();
  }
}
