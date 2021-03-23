import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {SidenavService} from '../../services';
import {MatSelect} from '@angular/material/select';
import {LanguageSelectorMode} from '../../enums';

@Component({
  selector: 'nl-material-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  @ViewChild('matSelect') matSelect!: MatSelect;

  @Input() locales: Array<string> = [];
  @Input() mode: LanguageSelectorMode = LanguageSelectorMode.dropdown;
  @Input() close$!: Subject<any>;

  open$!: Observable<boolean>;

  selectedLocale!: string;

  readonly dropdownMode = LanguageSelectorMode.dropdown;
  readonly toggleMode = LanguageSelectorMode.toggleButtons;

  private localeSubscription!: Subscription;
  private closeSelectSubscription!: Subscription;

  constructor(
    private translateService: TranslateService,
    private localizeService: LocalizeRouterService,
    private sidenavService: SidenavService,
  ) {
    const currentLang = this.translateService.currentLang;
    this.selectedLocale = currentLang;
    this.sidenavService.currentLang = currentLang;
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.openLocaleSubscription();

    if (this.close$) {
      this.openCloseSelectSubscription();
    }
  }

  ngOnDestroy(): void {
    this.localeSubscription.unsubscribe();
    this.closeSelectSubscription?.unsubscribe();
  }

  useLanguage(language: string): void {
    this.localizeService.changeLanguage(language);
    this.sidenavService.currentLang = language;
  }

  private openLocaleSubscription(): void {
    this.localeSubscription = this.sidenavService.currentLang$.subscribe((lang) => {
      this.selectedLocale = lang;
    });
  }

  private openCloseSelectSubscription(): void {
    this.closeSelectSubscription = this.close$.subscribe(() => {
      this.matSelect?.close();
    });
  }
}

