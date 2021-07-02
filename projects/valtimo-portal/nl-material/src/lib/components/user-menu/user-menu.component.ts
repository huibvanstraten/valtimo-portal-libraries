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
import {UserMenuMode} from '../../enums';
import {KeycloakService} from 'keycloak-angular';
import {BehaviorSubject, combineLatest, from, Observable, Subject, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map, take} from 'rxjs/operators';
import {AnimatedDotsService, SidenavService} from '../../services';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'nl-material-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @ViewChild('matSelect') matSelect!: MatSelect;

  @Input() mode!: UserMenuMode;
  @Input() close$!: Subject<any>;

  open$!: Observable<boolean>;

  readonly signingOut$ = new BehaviorSubject<boolean>(false);

  readonly userFirstName$ = new BehaviorSubject<string>('');

  readonly welcomeText$ = combineLatest(
    [
      this.animatedDotsService.dots$,
      this.translateService.stream('headerMenu.welcome'),
      this.userFirstName$,
    ]
  ).pipe(
    map(([dots, welcomeText, firstName]) => `${welcomeText} ${firstName || dots}`)
  );

  readonly mobileMode = UserMenuMode.mobile;
  readonly desktopMode = UserMenuMode.desktop;

  private closeMenuSubscription!: Subscription;

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly translateService: TranslateService,
    private readonly sidenavService: SidenavService,
    private readonly animatedDotsService: AnimatedDotsService
  ) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.setUserName();
    if (this.close$) {
      this.openCloseSelectSubscription();
    }
  }

  ngOnDestroy(): void {
    this.closeMenuSubscription?.unsubscribe();
  }

  logout(): void {
    this.signingOut$.next(true);

    this.keycloakService.logout().then(() => {
      this.signingOut$.next(false);
    });
  }

  private openCloseSelectSubscription(): void {
    this.closeMenuSubscription = this.close$.subscribe(() => {
      this.matSelect?.close();
    });
  }

  private setUserName(): void {
    from(this.keycloakService.isLoggedIn()).pipe(take(1)).subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.keycloakService.loadUserProfile().then((profile) => {
          this.userFirstName$.next(`${profile.firstName}`);
        });
      }
    });
  }
}
