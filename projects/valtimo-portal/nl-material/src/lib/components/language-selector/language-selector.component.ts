import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {LocalizeRouterService} from "@gilsdav/ngx-translate-router";
import {SidenavService} from "../../services";
import {LanguageSelectorMode} from "../../interfaces";

@Component({
  selector: 'nl-material-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {

  @Input() locales: Array<string> = [];

  @Input() mode: LanguageSelectorMode = LanguageSelectorMode.dropdown;

  open$!: Observable<boolean>;

  selectedLocale!: string;

  readonly dropdownMode = LanguageSelectorMode.dropdown;
  readonly toggleMode = LanguageSelectorMode.toggleButtons;

  private localeSubscription!: Subscription;

  constructor(
    private translateService: TranslateService,
    private localizeService: LocalizeRouterService,
    private sidenavService: SidenavService
  ) {
    const currentLang = this.translateService.currentLang;
    this.selectedLocale = currentLang;
    this.sidenavService.currentLang = currentLang;
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.localeSubscription = this.sidenavService.currentLang$.subscribe((lang) => {
      this.selectedLocale = lang;
    });
  }

  ngOnDestroy(): void {
    this.localeSubscription.unsubscribe();
  }

  useLanguage(language: string): void {
    this.localizeService.changeLanguage(language);
    this.sidenavService.currentLang = language;
  }
}
