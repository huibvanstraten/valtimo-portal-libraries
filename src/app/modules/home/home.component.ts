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
import {PortalTask, TaskService} from '@valtimo-portal/task';
import {TaskPreviewMode} from '../../../../projects/valtimo-portal/nl-material/src/lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loadingLatestCaseInstance$ = new BehaviorSubject<boolean>(true);
  latestCaseInstancePreview$: Observable<CasePreview | undefined> = this.caseService.getLatestCasePreview()
    .pipe(
      tap(() => {
        this.loadingLatestCaseInstance$.next(false);
      })
    );

  loadingLatestTask$ = new BehaviorSubject<boolean>(true);
  latestTask$: Observable<PortalTask | undefined> = this.taskService.findMostRecentTask(true)
    .pipe(
      tap(() => {
        this.loadingLatestTask$.next(false);
      })
    );

  dots$!: Observable<string>;

  readonly userFirstName$ = new BehaviorSubject<string>('...');

  readonly introductionType = CardType.introduction;
  readonly reminderType = CardType.reminder;

  readonly taskPreviewModeReminder = TaskPreviewMode.reminder;

  constructor(
    private readonly keycloakService: KeycloakService,
    private readonly animatedDotsService: AnimatedDotsService,
    private readonly caseService: CaseService,
    private readonly taskService: TaskService
  ) {
    this.dots$ = this.animatedDotsService.dots$;
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userFirstName$.next(`${profile.firstName}`);
    });
  }
}
