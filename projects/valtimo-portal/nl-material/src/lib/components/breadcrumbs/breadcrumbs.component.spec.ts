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

import {BreadcrumbsComponent} from './breadcrumbs.component';
import {MatCardModule} from '@angular/material/card';
import {SidenavServiceModule} from '../../services';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [BreadcrumbsComponent],
      imports: [
        MatCardModule,
        RouterTestingModule,
        SidenavServiceModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatButtonModule,
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
