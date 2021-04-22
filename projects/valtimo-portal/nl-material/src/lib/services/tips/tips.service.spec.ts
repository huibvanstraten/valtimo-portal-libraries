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

import {TipsService} from './tips.service';
import {TranslateModule} from '@ngx-translate/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('TipsService', () => {
  let service: TipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      imports: [
        TranslateModule.forRoot(),
        MatSnackBarModule,
        ApolloTestingModule.withClients(environment.api.graphql.clients.map((client) => client.name))
      ]
    })
    ;
    service = TestBed.inject(TipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
