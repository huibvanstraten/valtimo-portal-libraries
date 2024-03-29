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
import {map, tap} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'page-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent {

  loading$ = new BehaviorSubject<boolean>(true);

  tasks$ = this.taskService.findAllTasks().pipe(
    tap(() => {
      this.loading$.next(false);
    })
  );

  openTasks$ = this.tasks$.pipe(map((tasks) => tasks?.filter((task) => !task.isCompleted)));

  completedTasks$ = this.tasks$.pipe(map((tasks) => tasks?.filter((task) => task.isCompleted)));

  constructor(private readonly taskService: TaskService) {
  }
}
