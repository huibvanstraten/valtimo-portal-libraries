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

import {Component} from '@angular/core';
import {TaskService} from '@valtimo-portal/task';
import {map, take, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {

  loading$ = new BehaviorSubject<boolean>(true);

  submitting$ = new BehaviorSubject<boolean>(false);

  task$ = combineLatest([this.route.queryParams, this.taskService.findAllTasks()])
    .pipe(
      map(([params, tasks]) => tasks?.find((task) => task.taskId === params?.id)),
      tap((task) => {
        this.loading$.next(false);
      })
    );

  constructor(
    private readonly taskService: TaskService,
    private readonly route: ActivatedRoute,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
  }

  handleSubmit(submission: any): void {
    this.submitting$.next(true);

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
          this.taskService.completeTask(submission.data, params.id).subscribe(() => {
            this.submitting$.next(false);
            this.router.navigateByUrl(
              `${this.localizeRouterService.translateRoute('/tasks')}`
            );
          });
        }
      );
  }
}
