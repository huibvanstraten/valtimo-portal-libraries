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

import {AfterViewChecked, Component, Inject, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {CaseDetail, CaseMappingService, CasePreviewStatus, CaseService, PortalCaseInstance} from '@valtimo-portal/case';
import {map, switchMap, tap} from 'rxjs/operators';
import {BreadcrumbsService, CardType, CasePreviewMode} from '@valtimo-portal/nl-material';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject, combineLatest, merge, Observable, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {CaseDetailsService} from '../../services/case-details';
import {Environment} from '@valtimo-portal/shared';

@Component({
  selector: 'page-case',
  templateUrl: './case.component.html',
  styleUrls: ['./case.component.scss']
})
export class CaseComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('caseDetails', {read: ViewContainerRef}) caseDetailsVcRef!: ViewContainerRef;

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
      map((caseInstance) => this.caseMappingService.mapCaseInstanceToCaseDetails(caseInstance))
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

  readonly caseDetailsOverrideComponent = this.environment.viewOverrides?.caseDetails;

  private langChangeSubscription!: Subscription;

  private caseDetailsVcRefReady = false;

  private readonly breadcrumbPosition = 2;

  constructor(
    @Inject('environment') private readonly environment: Environment,
    private readonly caseService: CaseService,
    private readonly route: ActivatedRoute,
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService,
    private readonly caseMappingService: CaseMappingService,
    private readonly caseDetailsService: CaseDetailsService
  ) {
    this.title$ = this.breadcrumbsService.getBreadcrumbReplacement(this.breadcrumbPosition);
  }

  ngOnInit(): void {
    this.openLangChangeSubscription();
  }

  ngAfterViewChecked(): void {
    if (!this.caseDetailsVcRefReady && this.caseDetailsOverrideComponent && this.caseDetailsVcRef) {
      this.caseDetailsVcRefReady = true;
      this.caseDetailsService.loadComponent(this.caseDetailsVcRef, this.caseDetailsOverrideComponent);
    }
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.breadcrumbsService.clearBreadcrumbReplacement(this.breadcrumbPosition);
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

    this.breadcrumbsService.setBreadcrumbReplacement(
      {
        positionInUrl: this.breadcrumbPosition,
        replacementTitle: translatedTitle
      }
    );
  }
}
