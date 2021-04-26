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

import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TasksComponent} from './tasks.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {SpinnerModule, TaskPreviewModule} from '@valtimo-portal/nl-material';
import {CaseServiceModule} from '@valtimo-portal/case';
import {KeycloakAngularModule} from 'keycloak-angular';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {environment} from '@src/environments';
import {TasksRoutingModule} from '@tasks/tasks-routing.module';
import {TaskServiceModule} from '@valtimo-portal/task';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TasksComponent],
      imports: [
        NoopAnimationsModule,
        TranslateModule.forRoot(),
        TasksRoutingModule,
        TaskPreviewModule,
        TranslateModule,
        CaseServiceModule,
        TaskServiceModule,
        SpinnerModule,
        KeycloakAngularModule,
        RouterTestingModule,
        ApolloTestingModule.withClients(environment.api.graphql.clients.map((client) => client.name))]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
