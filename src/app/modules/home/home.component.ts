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

import {Component, OnInit} from '@angular/core';
import {AnimatedDotsService, CardType} from '@valtimo-portal/nl-material';
import {BehaviorSubject, Observable} from 'rxjs';
import {KeycloakService} from 'keycloak-angular';
import {CasePreview, CaseService} from '@valtimo-portal/case';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  latestCaseInstancePreview$: Observable<CasePreview | undefined> = this.caseService.getLatestCasePreview()
    .pipe(
      tap(() => {
        this.loadingLatestCaseInstance$.next(false);
      })
    );

  loadingLatestCaseInstance$ = new BehaviorSubject<boolean>(true);

  dots$!: Observable<string>;

  readonly userFirstName$ = new BehaviorSubject<string>('...');

  readonly introductionType = CardType.introduction;
  readonly reminderType = CardType.reminder;

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly animatedDotsService: AnimatedDotsService,
    private readonly caseService: CaseService
  ) {
    this.dots$ = this.animatedDotsService.dots$;
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userFirstName$.next(`${profile.firstName}`);
    });
  }
}
