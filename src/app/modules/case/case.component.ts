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

import {Component} from '@angular/core';
import {CaseService} from '@valtimo-portal/case';
import {map, switchMap, tap} from 'rxjs/operators';
import {BreadcrumbsService, CaseDetail, CasePreviewMode, TaskPreview} from '@valtimo-portal/nl-material';
import {CaseInstance} from '@valtimo-portal/graphql';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {CardType} from '../../../../projects/valtimo-portal/nl-material/src/lib';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent {

  loading$ = new BehaviorSubject<boolean>(true);

  case$ = this.route.queryParams.pipe(
    // @ts-ignore
    switchMap((params) => this.caseService.getCaseInstanceById(params?.id)),
    tap((caseInstance: CaseInstance) => {
      this.loading$.next(false);
      if (caseInstance?.caseDefinitionId) {
        this.breadcrumbsService.lastBreadcrumbTitle = caseInstance.caseDefinitionId;
      }
    })
  );

  caseDetails$: Observable<Array<CaseDetail>> = this.case$.pipe(
    map((caseInstance) => {
      return Object.keys(caseInstance.submission).map((key) => {
          return {key, value: caseInstance.submission[key]};
        }).filter((detail) => detail.key !== 'submit')
        || [];
    })
  );

  previewTasks$: Observable<Array<TaskPreview>> = this.case$.pipe(
    map((caseInstance) => {
      if (caseInstance) {
        return [{id: caseInstance.status, completed: false}];
      } else {
        return [];
      }
    })
  );

  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly caseStatusType = CardType.caseStatus;

  constructor(
    private readonly caseService: CaseService,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService
  ) {
  }
}
