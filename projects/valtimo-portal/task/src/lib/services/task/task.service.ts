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

import {Injectable} from '@angular/core';
import {FindAllTasksGQL, FindTasksGQL} from './queries';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {NotificationService} from '@valtimo-portal/shared';
import {TranslateService} from '@ngx-translate/core';
import {PortalTask} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(
    private readonly findTasksGQL: FindTasksGQL,
    private readonly findAllTasksGQL: FindAllTasksGQL,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
  }

  findTasks(externalCaseId: string, hideError = false): Observable<Array<PortalTask> | null | undefined> {
    return this.findTasksGQL.fetch({externalCaseId}).pipe(
      map((res) => res.data.findTasks?.map((task) => ({...task, createdOn: new Date(task.createdOn)}))),
      catchError(() => {
          if (!hideError) {
            this.notificationService.show(this.translateService.instant('tasks.noDataError'));
          }
          return of([]);
        }
      )
    );
  }

  findAllTasks(hideError = false): Observable<Array<PortalTask> | null | undefined> {
    return this.findAllTasksGQL.fetch().pipe(
      map((res) => res.data.findAllTasks?.map((task) => ({...task, createdOn: new Date(task.createdOn)}))),
      catchError(() => {
          if (!hideError) {
            this.notificationService.show(this.translateService.instant('tasks.noDataError'));
          }
          return of([]);
        }
      )
    );
  }
}
