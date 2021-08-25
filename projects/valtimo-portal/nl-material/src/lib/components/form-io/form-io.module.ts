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

import {Inject, Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormIoComponent} from './form-io.component';
import {MatIconModule} from '@angular/material/icon';
import {FormioModule as AngularFormioModule} from '@formio/angular';
import {SpinnerModule} from '../spinner';
import {Environment} from '@valtimo-portal/shared';

@NgModule({
  declarations: [FormIoComponent],
  imports: [
    CommonModule,
    AngularFormioModule,
    MatIconModule,
    SpinnerModule,
  ],
  exports: [FormIoComponent]
})
export class FormIoModule {
  constructor(@Inject('environment') private readonly environment: Environment, private readonly injector: Injector) {
    environment.customFormioComponentRegisterFunctions?.forEach((registerFunction) => {
      registerFunction(injector);
    });
  }
}
