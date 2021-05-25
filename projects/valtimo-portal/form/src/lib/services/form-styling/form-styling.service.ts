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

import {Injectable} from '@angular/core';
import {FormioForm} from '@formio/angular';
import {FormMappingService} from '../form-mapping';
import {ExtendedComponentSchema} from 'formiojs';

@Injectable({
  providedIn: 'root'
})
export class FormStylingService {

  constructor(
    private readonly formMappingService: FormMappingService
  ) {
  }

  styleForm(form: FormioForm): FormioForm {
    const styleFunction = (component: ExtendedComponentSchema): ExtendedComponentSchema => ({
      ...component,
      customClass: 'mat-form-field-infix'
    });

    return this.formMappingService.mapComponents(form, styleFunction);
  }
}
