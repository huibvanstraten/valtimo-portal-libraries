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
import {SidenavService} from '../../services';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Subject, Subscription} from 'rxjs';
import {MatMenuTrigger} from '@angular/material/menu';
import {LanguageSelectorMode, UserMenuMode} from '../../enums';

@Component({
  selector: 'nl-material-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit, OnDestroy {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;

  @Input() locales: Array<string> = [];

  readonly dropdownMode = LanguageSelectorMode.dropdown;
  readonly toggleMode = LanguageSelectorMode.toggleButtons;

  readonly mobileMode = UserMenuMode.mobile;
  readonly desktopMode = UserMenuMode.desktop;

  readonly closeDropdowns$ = new Subject();

  private breakPointSubscription!: Subscription;

  constructor(private readonly sidenavService: SidenavService, private readonly observer: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.openBreakpointSubscription();
  }

  ngOnDestroy(): void {
    this.breakPointSubscription.unsubscribe();
  }

  handleClick(): void {
    this.sidenavService.open = false;
  }

  private openBreakpointSubscription(): void {
    this.breakPointSubscription = this.observer.observe('(min-width: 960px)').subscribe(() => {
      this.menuTrigger?.closeMenu();
      this.closeDropdowns$.next();
    });
  }
}
