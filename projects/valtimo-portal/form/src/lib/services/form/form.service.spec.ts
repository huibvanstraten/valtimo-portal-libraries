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
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {environment} from '@src/environments';
import {mockFormDefinitionsResult} from './mock-data';
import {FormService} from './form.service';
import {GetAllFormDefinitionsDocument} from './queries/get-all-form-definitions/get-all-form-definitions.graphql-gen';

describe('FormService', () => {
  let service: FormService;
  let controller: ApolloTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule.withClients(
          environment.api.graphql.clients.map((client) => client.name)
        )
      ],
    });
    service = TestBed.inject(FormService);
    controller = TestBed.inject(ApolloTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return form definitions', (done) => {
    service.getAllFormDefinitions().subscribe((definitions) => {
      expect(definitions[2].name).toEqual('test');
      done();
    });

    const op = controller.expectOne(GetAllFormDefinitionsDocument);

    op.flush(mockFormDefinitionsResult);
  });
});
