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
import {BreadcrumbsService} from '@valtimo-portal/nl-material';
import {FormService} from '@valtimo-portal/form';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {switchMap, take} from 'rxjs/operators';
import {CaseService} from '@valtimo-portal/case';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit, OnDestroy {

  formDefinition$ = this.route.queryParams.pipe(
    switchMap((params) => this.formService.getFormDefinitionByName(params.id))
  );

  title$!: Observable<string>;

  submitting$ = new BehaviorSubject<boolean>(false);

  private langChangeSubscription!: Subscription;

  constructor(
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly formService: FormService,
    private readonly caseService: CaseService,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
    this.title$ = this.breadcrumbsService.lastBreadcrumbTitle$;
  }

  ngOnInit(): void {
    this.setBreadcrumbTitle();
    this.openLangChangeSubscription();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.breadcrumbsService.clearLastBreadcrumbTitle();
  }

  openLangChangeSubscription(): void {
    this.langChangeSubscription =
      this.translateService.onLangChange
        .subscribe(() => {
          this.setBreadcrumbTitle();
        });
  }

  handleSubmit(submission: any): void {
    this.submitting$.next(true);

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
          this.caseService.submitCase(submission.data, params.id).subscribe(() => {
            this.submitting$.next(false);
            this.router.navigateByUrl(
              `${this.localizeRouterService.translateRoute('/cases')}`
            );
          });
        }
      );
  }

  private setBreadcrumbTitle(): void {
    this.route.queryParams.pipe(
      take(1)
    ).subscribe((params) => {
        this.breadcrumbsService.lastBreadcrumbTitle =
          this.translateService.instant(
            `${params.id}.new`
          );
      }
    );
  }
}
