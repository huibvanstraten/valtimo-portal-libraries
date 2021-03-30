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
import {FormApiService} from '@valtimo-portal/form';
import {combineLatest, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {map, take} from 'rxjs/operators';
import {FormioForm} from '@formio/angular';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit, OnDestroy {

  private langChangeSubscription!: Subscription;

  formDefinition$ = combineLatest([this.route.queryParams, this.formApiService.getAvailableFormDefinitions()])
    .pipe(
      map(
        ([params, definitions]) =>
          definitions.find((definition) => definition.name === params.id)?.definition as FormioForm
      ));

  constructor(
    private breadcrumbsService: BreadcrumbsService,
    private translateService: TranslateService,
    private route: ActivatedRoute,
    private formApiService: FormApiService,
  ) {
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

  private setBreadcrumbTitle(): void {
    this.route.queryParams.pipe(
      take(1)
    ).subscribe((params) => {
        this.breadcrumbsService.lastBreadcrumbTitle =
          this.translateService.instant(
            `caseStrings.${params.id}.new`
          );
      }
    );
  }
}
