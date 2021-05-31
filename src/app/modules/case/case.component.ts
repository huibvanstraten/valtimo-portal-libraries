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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {CasePreviewStatus, CaseService, PortalCaseInstance} from '@valtimo-portal/case';
import {map, switchMap, tap} from 'rxjs/operators';
import {BreadcrumbsService, CaseDetail, CasePreviewMode} from '@valtimo-portal/nl-material';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, combineLatest, merge, Observable, Subscription} from 'rxjs';
import {CardType} from '../../../../projects/valtimo-portal/nl-material/src/lib';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit, OnDestroy {

  title$!: Observable<string>;

  loading$ = new BehaviorSubject<boolean>(true);

  case$ = this.route.queryParams.pipe(
    // @ts-ignore
    switchMap((params) => this.caseService.getCaseInstanceById(params?.id)),
    tap((caseInstance: PortalCaseInstance) => {
      const caseDefinitionId = caseInstance?.caseDefinitionId;
      this.loading$.next(false);
      if (caseDefinitionId) {
        this.setBreadcrumbTitle(caseDefinitionId);
      }
    })
  );

  caseDetails$: Observable<Array<CaseDetail>> = merge(this.translateService.onLangChange, this.case$)
    .pipe(
      switchMap(() => this.case$),
      map((caseInstance) => {
        return Object.keys(caseInstance.submission)
            .map((key) => {
              return {key, value: caseInstance.submission[key]};
            })
            .filter((detail) => detail.key !== 'submit')
            .map((detail) => {
              const value = `${detail.value}`.trim().toLocaleLowerCase();

              if (value === 'true') {
                return {...detail, value: this.translateService.instant('case.true')};
              } else if (value === 'false') {
                return {...detail, value: this.translateService.instant('case.false')};
              }

              return detail;
            })
          || [];
      })
    );

  previewStatuses$: Observable<Array<CasePreviewStatus>> = combineLatest(
    [this.case$, this.caseService.getAllCaseDefinitions()]
  )
    .pipe(
      map(([caseInstance, definitions]) => {
        const statusDefinition = caseInstance &&
          definitions.find((definition) =>
            definition.id === caseInstance.caseDefinitionId)?.statusDefinition;

        if (caseInstance && statusDefinition) {
          return this.caseService.getCaseInstancePreview(caseInstance, statusDefinition).statuses;
        } else {
          return [];
        }
      })
    );

  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly caseStatusType = CardType.caseStatus;

  private langChangeSubscription!: Subscription;

  private readonly breadcrumbPosition = 2;

  constructor(
    private readonly caseService: CaseService,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService,
  ) {
    this.title$ = this.breadcrumbsService.getBreadcrumbTitleReplacement(this.breadcrumbPosition);
  }

  ngOnInit(): void {
    this.openLangChangeSubscription();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.breadcrumbsService.clearBreadcrumbTitleReplacement(this.breadcrumbPosition);

  }

  openLangChangeSubscription(): void {
    this.langChangeSubscription = this.translateService.onLangChange
      .pipe(
        switchMap(() => this.case$),
      ).subscribe((caseInstance) => {
        const caseDefinitionId = caseInstance?.caseDefinitionId;
        if (caseDefinitionId) {
          this.setBreadcrumbTitle(caseDefinitionId);
        }
      });
  }

  private setBreadcrumbTitle(caseDefinitionId: string): void {
    const translatedTitle = this.translateService.instant(
      `${caseDefinitionId}.my`
    );

    this.breadcrumbsService.setBreadcrumbTitleReplacement(
      {
        positionInUrl: this.breadcrumbPosition,
        replacementTitle: translatedTitle
      }
    );
  }
}
