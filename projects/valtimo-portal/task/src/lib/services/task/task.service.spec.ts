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

import {TestBed} from '@angular/core/testing';
import {TaskService} from './task.service';
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {GetAllCaseDefinitionsDocument} from './queries/get-all-case-definitions/get-all-case-definitions.graphql-gen';
import {environment} from '@src/environments';
import {mockCaseDefinitionsResult} from './mock-data';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule} from '@ngx-translate/core';

describe('TaskService', () => {
  let service: TaskService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule.withClients(
          environment.api.graphql.clients.map((client) => client.name)
        ),
        MatSnackBarModule,
        TranslateModule.forRoot()
      ],
    });
    service = TestBed.inject(TaskService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return task definitions', (done) => {
    service.getAllCaseDefinitions().subscribe((definitions) => {
      expect(definitions[1].id).toEqual('test');
      done();
    });

    const op = controller.expectOne(GetAllCaseDefinitionsDocument);

    op.flush(mockCaseDefinitionsResult);
  });
});
