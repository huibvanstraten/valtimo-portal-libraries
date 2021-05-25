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
import {TranslateService} from '@ngx-translate/core';
import {FormioForm} from '@formio/angular';
import {FormMappingService} from '../form-mapping';
import {ExtendedComponentSchema} from 'formiojs';

@Injectable({
  providedIn: 'root'
})
export class FormTranslationService {

  constructor(
    private readonly translateService: TranslateService,
    private readonly formMappingService: FormMappingService
  ) {
  }

  translateForm(form: FormioForm, caseDefinitionId: string): FormioForm {
    const translateFunction = (component: ExtendedComponentSchema): ExtendedComponentSchema => ({
      ...component,
      ...(component.label && {label: `${this.getTranslation(`${component.key}`, caseDefinitionId) || component.label}`})
    });

    return this.formMappingService.mapComponents(form, translateFunction);
  }

  private getTranslation(text: string, caseDefinitionId: string): string | boolean {
    const genericKey = `formTranslations.${text}`;
    const genericTranslation = this.translateService.instant(genericKey);

    const definitionKey = `${caseDefinitionId}.properties.${text}`;
    const definitionTranslation = this.translateService.instant(definitionKey);

    if (definitionKey !== definitionTranslation) {
      return definitionTranslation;
    } else if (genericKey !== genericTranslation) {
      return genericTranslation;
    } else {
      return false;
    }
  }
}
