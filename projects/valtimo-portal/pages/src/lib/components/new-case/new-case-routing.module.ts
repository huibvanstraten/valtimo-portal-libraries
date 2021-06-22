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
import {NewCaseComponent} from './new-case.component';
import {LocalizeRouterModule} from '@gilsdav/ngx-translate-router';
import {KeycloakAppAuthGuard} from '@valtimo-portal/authentication';

const routes: Routes = [
  {
    path: '', component: NewCaseComponent, canActivate: [KeycloakAppAuthGuard],
  },
  {
    path: 'caseConfirmation',
    loadChildren: () => import('../case-confirmation').then(m => m.CaseConfirmationModule),
    canActivate: [KeycloakAppAuthGuard],
    data: {
      title: 'TITLES.caseConfirmation',
      animation: 'DetailPage',
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewCaseRoutingModule {
}