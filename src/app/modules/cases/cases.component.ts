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

import {Component, OnInit} from '@angular/core';
import {CasePreview, CasePreviewMode} from '@valtimo-portal/nl-material';
import {CaseApiService} from '@valtimo-portal/case';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit {

  currentPreviewMode = CasePreviewMode.current;

  cases$: Observable<Array<CasePreview>> = this.caseApiService.getAllCaseInstances()
    .pipe(
      map((instances) => instances.map((instance) => (
          {
            id: instance.caseDefinitionId,
            code: instance.id,
            tasks: []
          }
        ))
      ));

  constructor(private readonly caseApiService: CaseApiService) {
  }

  ngOnInit(): void {
  }

}
