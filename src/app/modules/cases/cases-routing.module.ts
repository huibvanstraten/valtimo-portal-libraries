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

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CasesComponent} from './cases.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';
import {KeycloakAppAuthGuard} from '@valtimo-portal/authentication';

const routes: Routes = [
  {
    path: '',
    component: CasesComponent,
    canActivate: [KeycloakAppAuthGuard],
  },
  {
    path: 'newCase',
    loadChildren: () => import('@new-case/new-case.module').then(m => m.NewCaseModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.newCase',
      animation: 'DetailPage',
    }
  },
  {
    path: 'case',
    loadChildren: () => import('@case/case.module').then(m => m.CaseModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.case',
      animation: 'DetailPage',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CasesRoutingModule {
}
