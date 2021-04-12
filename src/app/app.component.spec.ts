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
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {
  AnimatedDotsServiceModule,
  BreadcrumbsModule,
  BreadcrumbsServiceModule,
  HeaderLogoModule,
  HeaderMenuModule,
  NavigationMenuModule,
  SidenavModule,
  ToolbarModule
} from '@valtimo-portal/nl-material';
import {KeycloakAngularModule} from 'keycloak-angular';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GraphQLModule} from '@valtimo-portal/graphql';
import {HttpLoaderFactory} from '@app/app.module';
import {environment} from '../environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      imports: [
        RouterTestingModule,
        KeycloakAngularModule,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient, 'environment']
          }
        }),
        BrowserAnimationsModule,
        ToolbarModule,
        HeaderLogoModule,
        NavigationMenuModule,
        SidenavModule,
        HeaderMenuModule,
        BreadcrumbsServiceModule,
        BreadcrumbsModule,
        GraphQLModule,
        AnimatedDotsServiceModule,
      ],
      declarations: [
        AppComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
