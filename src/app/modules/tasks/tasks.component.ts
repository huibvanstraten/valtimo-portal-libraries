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
import {CaseService} from '@valtimo-portal/case';
import {TaskService} from '@valtimo-portal/task';
import {map, switchMap, tap} from 'rxjs/operators';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$ = this.caseService.getAllCaseInstances()
    .pipe(
      switchMap((instances) =>
        combineLatest(instances.map((instance) => this.taskService.findTasks(instance.id)))
      ),
      map((caseTasks) => Array.prototype.concat.apply([], caseTasks)),
      tap((tasks) => console.log(tasks))
    );

  constructor(private readonly caseService: CaseService, private readonly taskService: TaskService) {
  }

  ngOnInit()
    :
    void {
  }

}
