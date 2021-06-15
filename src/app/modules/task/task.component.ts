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
import {map, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {BreadcrumbsService} from '@valtimo-portal/nl-material';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {

  loading$ = new BehaviorSubject<boolean>(true);

  submitting$ = new BehaviorSubject<boolean>(false);

  task$ = combineLatest([this.route.queryParams, this.taskService.findAllTasks()])
    .pipe(
      map(([params, tasks]) => tasks?.find((task) => task.taskId === params?.id)),
      tap((task) => {
        this.loading$.next(false);
        if (task) {
          this.setBreadcrumbTitle(task);
        }
      })
    );

  title$!: Observable<string>;

  readonly reset$ = new Subject<boolean>();

  private langChangeSubscription!: Subscription;

  private readonly breadcrumbPosition = 2;

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
          this.taskService.completeTask(submission.data, params.id).subscribe((res) => {
            this.submitting$.next(false);

            if (res) {
              this.router.navigateByUrl(
                `${this.localizeRouterService.translateRoute('/tasks')}`
              );
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
        switchMap(() => this.task$),
      ).subscribe((task) => {
        if (task) {
          this.setBreadcrumbTitle(task);
        }
      });
  }

  private setBreadcrumbTitle(task: PortalTask): void {
    const translatedTitle = this.translateService.instant(
      `${task.caseDefinitionId}.tasks.${task.taskDefinitionKey}`
    );

    this.breadcrumbsService.setBreadcrumbReplacement(
      {
        positionInUrl: this.breadcrumbPosition,
        replacementTitle: translatedTitle
      }
    );
  }
}
