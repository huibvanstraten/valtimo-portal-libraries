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

import {HomeComponent} from './home.component';
import {CardModule, CasePreviewModule, NewCaseMenuModule} from '@valtimo-portal/nl-material';
import {TranslateModule} from '@ngx-translate/core';
import {KeycloakAngularModule} from 'keycloak-angular';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {RouterTestingModule} from '@angular/router/testing';
import {ApolloTestingController, ApolloTestingModule} from 'apollo-angular/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let controller: ApolloTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [HomeComponent],
      imports: [
        NoopAnimationsModule,
        CardModule,
        TranslateModule.forRoot(),
        NewCaseMenuModule,
        CasePreviewModule,
        KeycloakAngularModule,
        RouterTestingModule,
        ApolloTestingModule.withClients(['portal-api'])]
    })
      .compileComponents();
  });

  beforeEach(() => {
    controller = TestBed.inject(ApolloTestingController);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
