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
import {CasePreviewMode, DropdownOption} from '@valtimo-portal/nl-material';
import {CasePreview, CaseService} from '@valtimo-portal/case';
import {take, tap} from 'rxjs/operators';
import {BehaviorSubject, Subscription} from 'rxjs';
import {Sort} from '@valtimo-portal/graphql';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent implements OnInit, OnDestroy {

  loading$ = new BehaviorSubject<boolean>(true);

  currentPreviewMode = CasePreviewMode.current;

  readonly casePreviews$ = new BehaviorSubject<Array<CasePreview>>([]);

  readonly sortOptions: Array<DropdownOption> = [
    {translationKey: 'dateDesc', value: Sort.Desc, default: true},
    {translationKey: 'dateAsc', value: Sort.Asc}
  ];

  private casePreviewsSubscription!: Subscription;

  private readonly sort$ = new BehaviorSubject<Sort>(this.sortOptions[0].value);

  constructor(private readonly caseService: CaseService) {
  }

  ngOnInit(): void {
    this.setCasePreviewsSubscription();
  }

  ngOnDestroy(): void {
    this.closeCasePreviewsSubscription();
  }

  sortChange(sort: Sort): void {
    this.sort$.next(sort);
    this.setCasePreviewsSubscription();
  }

  private setCasePreviewsSubscription(): void {
    this.closeCasePreviewsSubscription();

    this.sort$.pipe(take(1)).subscribe((sort) => {
      this.casePreviewsSubscription = this.caseService.getAllCasePreviews(sort)
        .pipe(
          tap((casePreviews) => {
            this.casePreviews$.next(casePreviews);
            this.loading$.next(false);
          })
        ).subscribe();
    });
  }

  private closeCasePreviewsSubscription(): void {
    this.casePreviewsSubscription?.unsubscribe();
  }
}
