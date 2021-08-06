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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {PortalTask, TaskService} from '@valtimo-portal/task';
import {switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, of, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {BreadcrumbsService} from '@valtimo-portal/nl-material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'page-public-task',
  templateUrl: './public-task.component.html',
  styleUrls: ['./public-task.component.scss']
})
export class PublicTaskComponent implements OnInit, OnDestroy {

  loading$ = new BehaviorSubject<boolean>(true);

  submitting$ = new BehaviorSubject<boolean>(false);

  success$ = new BehaviorSubject<boolean>(false);

  publicTask$ = this.route.queryParams.pipe(
    switchMap((params) => params?.id ? this.taskService.findPublicTask(params.id) : of(undefined)),
    tap(() => {
      this.loading$.next(false);
    })
  );

  title$!: Observable<string>;

  readonly reset$ = new Subject<boolean>();

  private langChangeSubscription!: Subscription;

  private readonly breadcrumbPosition = 1;

  constructor(
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router,
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService
  ) {
    this.title$ = this.breadcrumbsService.getBreadcrumbReplacement(this.breadcrumbPosition);
  }

  ngOnInit(): void {
    this.openLangChangeSubscription();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.breadcrumbsService.clearBreadcrumbReplacement(this.breadcrumbPosition);
  }

  handleSubmit(submission: any): void {
    this.submitting$.next(true);

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
          this.taskService.completePublicTask(submission.data, params.id).subscribe((res) => {
            this.submitting$.next(false);

            if (res) {
              this.success$.next(true);
            } else {
              this.reset$.next(true);
            }
          });
        }
      );
  }

  private openLangChangeSubscription(): void {
    this.langChangeSubscription = this.translateService.onLangChange
      .pipe(
        switchMap(() => this.publicTask$),
      ).subscribe((task) => {
        if (task) {
          this.setBreadcrumbTitle(task);
        }
      });
  }

  private setBreadcrumbTitle(task: PortalTask): void {
    const translationKey = `${task.caseDefinitionId}.tasks.${task.taskDefinitionKey}`;
    const translatedTitle = this.translateService.instant(translationKey);

    if (translatedTitle !== translationKey) {
      this.breadcrumbsService.setBreadcrumbReplacement(
        {
          positionInUrl: this.breadcrumbPosition,
          replacementTitle: translatedTitle
        }
      );
    }
  }
}
