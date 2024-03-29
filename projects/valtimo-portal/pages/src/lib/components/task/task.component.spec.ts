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

import {TaskComponent} from './task.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';
import {FormIoModule, SpinnerModule, TaskPreviewModule} from '@valtimo-portal/nl-material';
import {CaseServiceModule} from '@valtimo-portal/case';
import {KeycloakAngularModule} from 'keycloak-angular';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {environment} from '@src/environments';
import {TasksRoutingModule} from '@tasks/tasks-routing.module';
import {TaskServiceModule} from '@valtimo-portal/task';
import {TasksComponent} from '@src/app';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [TaskComponent, TasksComponent],
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
        ApolloTestingModule.withClients(environment.api.graphql.clients.map((client) => client.name)),
        FormIoModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
