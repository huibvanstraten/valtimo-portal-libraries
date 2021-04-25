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
import {CaseService} from '@valtimo-portal/case';
import {PortalTask, TaskService} from '@valtimo-portal/task';
import {map, switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest} from 'rxjs';

const mockTaskCompleted: PortalTask = {
  completed: true,
  createdOn: new Date(2021, 4, 12),
  formDefinition: {},
  taskId: 'XXX'
};
const mockTaskOpen: PortalTask = {
  completed: false,
  createdOn: new Date(2021, 4, 14),
  formDefinition: {},
  taskId: 'YYY'
};

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  loading$ = new BehaviorSubject<boolean>(true);

  tasks$ = this.caseService.getAllCaseInstances()
    .pipe(
      switchMap((instances) =>
        combineLatest(instances.map((instance) => this.taskService.findTasks(instance.id)))
      ),
      map((caseTasks) => Array.prototype.concat.apply([], caseTasks)),
      map((portalTasks) => ([...portalTasks, mockTaskCompleted, mockTaskOpen, mockTaskCompleted, mockTaskOpen])),
      tap(() => {
        this.loading$.next(false);
      })
    );

  openTasks$ = this.tasks$.pipe(map((tasks) => tasks.filter((task) => !task.completed)));

  completedTasks$ = this.tasks$.pipe(map((tasks) => tasks.filter((task) => task.completed)));

  constructor(private readonly caseService: CaseService, private readonly taskService: TaskService) {
  }
}
