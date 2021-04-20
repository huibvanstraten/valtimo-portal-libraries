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
import {CaseService} from '@valtimo-portal/case';
import {switchMap, tap} from 'rxjs/operators';
import {BreadcrumbsService} from '@valtimo-portal/nl-material';
import {CaseInstance} from '@valtimo-portal/graphql';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit {

  case$ = this.route.queryParams.pipe(
    // @ts-ignore
    switchMap((params) => this.caseService.getCaseInstanceById(params?.id)),
    tap((caseInstance: CaseInstance) => {
      if (caseInstance?.caseDefinitionId) {
        this.breadcrumbsService.lastBreadcrumbTitle = caseInstance.caseDefinitionId;
      }
    })
  );

  constructor(
    private readonly caseService: CaseService,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService
  ) {
  }

  ngOnInit(): void {
  }

}
