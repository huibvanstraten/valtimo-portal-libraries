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

import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {
  AnimatedDotsServiceModule,
  BreadcrumbsModule,
  BreadcrumbsServiceModule,
  HeaderLogoModule,
  HeaderMenuModule,
  NavigationMenuModule,
  SidenavModule,
  ToolbarModule,
} from '@valtimo-portal/nl-material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {environment} from '../environments';
import {KeycloakAngularModule, KeycloakService} from 'keycloak-angular';
import {initializeKeycloak, KeycloakAppAuthGuard} from '@valtimo-portal/authentication';
import {GraphQLModule} from '@valtimo-portal/graphql';

export const HttpLoaderFactory = (http: HttpClient) => new MultiTranslateHttpLoader(http, [
  {prefix: './translate/', suffix: '.json'},
  {prefix: './translate/home/', suffix: '.json'}
]);

@NgModule({
  providers: [
    {provide: 'environment', useValue: environment},
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService, 'environment'],
    },
    KeycloakAppAuthGuard
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    KeycloakAngularModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    HeaderLogoModule,
    NavigationMenuModule,
    SidenavModule,
    HeaderMenuModule,
    BreadcrumbsServiceModule,
    BreadcrumbsModule,
    GraphQLModule,
    AnimatedDotsServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    const translationEnv = environment.translation;
    const defaultLocaleIndex = translationEnv.defaultLocaleIndex || 0;
    translateService.setDefaultLang(translationEnv.supportedLocales[defaultLocaleIndex]);
  }
}
