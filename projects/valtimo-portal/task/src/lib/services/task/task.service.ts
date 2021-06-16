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
import {FindAllTasksGQL, FindAllTasksQuery, FindTasksGQL} from './queries';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {NotificationService} from '@valtimo-portal/shared';
import {TranslateService} from '@ngx-translate/core';
import {PortalTask} from '../../interfaces';
import {QueryRef} from 'apollo-angular';
import {Exact} from '@valtimo-portal/graphql';
import {CompleteTaskGQL} from './mutations';
import {FetchResult} from '@apollo/client/core';
import {CompleteTaskMutation} from './mutations/complete-task/complete-task.graphql-gen';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private findAllTasksQueryRef!: QueryRef<FindAllTasksQuery, Exact<{ [key: string]: never; }>>;

  constructor(
    private readonly findTasksGQL: FindTasksGQL,
    private readonly findAllTasksGQL: FindAllTasksGQL,
    private readonly completeTaskGQL: CompleteTaskGQL,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
  }

  findTasks(caseId: string, hideError = false): Observable<Array<PortalTask> | null | undefined> {
    return this.findTasksGQL.fetch({caseId}).pipe(
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
    if (!this.findAllTasksQueryRef) {
      this.findAllTasksQueryRef = this.findAllTasksGQL.watch();
    } else {
      this.findAllTasksQueryRef.refetch();
    }

    return this.findAllTasksQueryRef.valueChanges.pipe(
      map((res) =>
        res.data.findAllTasks?.map((task) =>
          ({...task, createdOn: new Date(task.createdOn)}))
      ),
      catchError(() => {
          if (!hideError) {
            this.notificationService.show(this.translateService.instant('tasks.noDataError'));
          }
          return of([]);
        }
      )
    );
  }

  completeTask(submission: any, taskId: string): Observable<FetchResult<CompleteTaskMutation> | undefined> {
    return this.completeTaskGQL.mutate({submission, taskId}).pipe(
      catchError(() => {
          this.notificationService.show(this.translateService.instant('formErrors.validationGeneric'));
          return of(undefined);
        }
      )
    );
  }
}
