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

import {Location} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader
} from '@gilsdav/ngx-translate-router';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments';
import {PortalRoute} from '@valtimo-portal/shared';
import {KeycloakAppAuthGuard} from '@valtimo-portal/authentication';

const routes: Array<PortalRoute> = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.home',
      icon: 'home',
      animation: 'HomePage',
      isHome: true
    }
  },
  {
    path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.tasks',
      icon: 'tasks',
      animation: 'TasksPage'
    }
  },
  {
    path: 'cases', loadChildren: () => import('./modules/cases/cases.module').then(m => m.CasesModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.cases',
      icon: 'briefcase',
      animation: 'CasesPage'
    }
  },
  {
    path: '', redirectTo: '/', pathMatch: 'full', data: {hideInNav: true}
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full', data: {hideInNav: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LocalizeRouterModule.forRoot(routes, {
    parser: {
      provide: LocalizeParser,
      useFactory: (translate: TranslateService, location: Location, settings: LocalizeRouterSettings) =>
        new ManualParserLoader(translate, location, settings, environment.translation.supportedLocales, 'ROUTES.'),
      deps: [TranslateService, Location, LocalizeRouterSettings]
    }
  })],
  exports: [RouterModule]
})
class AppRoutingModule {
}

export {routes, AppRoutingModule};
