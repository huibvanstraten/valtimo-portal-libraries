import {Component, Input} from '@angular/core';
import {SidenavService} from "../../services";
import {Observable} from "rxjs";

@Component({
  selector: 'nl-material-header-logo',
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss']
})
export class HeaderLogoComponent {
  @Input() logoImagePath!: string;

  currentLang$!: Observable<string>;

  constructor(private sidenavService: SidenavService) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }
}
