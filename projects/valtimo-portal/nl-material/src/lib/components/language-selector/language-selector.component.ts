/*
 * Copyright 2015-2021 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    private readonly translateService: TranslateService,
    private readonly localizeService: LocalizeRouterService,
    private readonly sidenavService: SidenavService,
  ) {
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

