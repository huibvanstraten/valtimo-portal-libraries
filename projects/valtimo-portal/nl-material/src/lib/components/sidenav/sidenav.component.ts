import {Component} from '@angular/core';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';

@Component({
  selector: 'nl-material-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  open$!: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  onOpenedChange(opened: boolean): void {
    this.sidenavService.open = opened;
  }

}
