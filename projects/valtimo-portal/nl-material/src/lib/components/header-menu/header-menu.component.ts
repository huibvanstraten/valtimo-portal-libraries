import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {LocalizeRouterService} from "@gilsdav/ngx-translate-router";
import {SidenavService} from "../../services";
import {Observable} from "rxjs";

@Component({
  selector: 'nl-material-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {

  @Input() locales: Array<string> = [];

  open$!: Observable<boolean>;

  selectedLocale!: string;

  constructor(private translateService: TranslateService, private localizeService: LocalizeRouterService, private sidenavService: SidenavService) {
    const currentLang = this.translateService.currentLang;
    this.selectedLocale = currentLang;
    this.sidenavService.currentLang = currentLang;
    this.open$ = this.sidenavService.open$;
  }

  useLanguage(language: string): void {
    this.localizeService.changeLanguage(language);
    this.sidenavService.currentLang = language;
  }
}
