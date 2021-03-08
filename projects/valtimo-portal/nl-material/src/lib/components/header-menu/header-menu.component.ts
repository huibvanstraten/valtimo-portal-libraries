import {Component, Input} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'nl-material-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {

  @Input() locales: Array<string> = [];

  selectedLocale!: string;

  constructor(private translateService: TranslateService) {
    this.selectedLocale = this.translateService.currentLang
  }

  useLanguage(language: string): void {
    this.translateService.use(language);
  }
}
