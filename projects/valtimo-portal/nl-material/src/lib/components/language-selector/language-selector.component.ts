import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {LocalizeRouterService} from "@gilsdav/ngx-translate-router";
import {SidenavService} from "../../services";
import {LanguageSelectorMode} from "../../interfaces";

@Component({
  selector: 'nl-material-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {

  @Input() locales: Array<string> = [];

  @Input() mode: LanguageSelectorMode = LanguageSelectorMode.dropdown;

  open$!: Observable<boolean>;

  selectedLocale!: string;

  readonly dropdownMode = LanguageSelectorMode.dropdown;
  readonly toggleMode = LanguageSelectorMode.toggleButtons;

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
