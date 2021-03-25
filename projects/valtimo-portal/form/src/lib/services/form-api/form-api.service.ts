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
import {GetAvailableFormDefinitionsGQL} from './queries/get-available-form-definitions';
import {map} from 'rxjs/operators';
import {AvailableFormDefinition} from '../../interfaces';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormApiService {

  constructor(
    private getAvailableFormDefinitionsGQL: GetAvailableFormDefinitionsGQL
  ) {
  }

  getAvailableFormDefinitions(): Observable<Array<AvailableFormDefinition>> {
    return this.getAvailableFormDefinitionsGQL.fetch().pipe(
      map((res) => (
          res.data.availableFormDefinitions.map((definition) => ({
            name: definition.name,
            definition: JSON.parse(definition.formDefinition)
          })) as Array<AvailableFormDefinition>
        )
      )
    );
  }
}