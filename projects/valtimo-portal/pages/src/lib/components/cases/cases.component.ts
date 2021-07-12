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
import {CasePreviewMode, DropdownOption} from '@valtimo-portal/nl-material';
import {CasePreview, CaseService} from '@valtimo-portal/case';
import {switchMap, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {Sort} from '@valtimo-portal/graphql';

@Component({
  selector: 'page-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {

  currentPreviewMode = CasePreviewMode.current;

  readonly sortOptions: Array<DropdownOption> = [
    {translationKey: 'dateDesc', value: Sort.Desc, default: true},
    {translationKey: 'dateAsc', value: Sort.Asc}
  ];

  openCasesLoading$ = new BehaviorSubject<boolean>(true);
  completedCasesLoading$ = new BehaviorSubject<boolean>(true);

  private readonly openCasesSort$ = new BehaviorSubject<Sort>(this.sortOptions[0].value);
  private readonly completedCasesSort$ = new BehaviorSubject<Sort>(this.sortOptions[0].value);

  readonly openCases$: Observable<Array<CasePreview>> = this.openCasesSort$.pipe(
    switchMap((sort) => this.caseService.getOpenCasePreviews(sort)),
    tap(() => this.openCasesLoading$.next(false))
  );

  readonly completedCases$: Observable<Array<CasePreview>> = this.completedCasesSort$.pipe(
    switchMap((sort) => this.caseService.getCompletedCasePreviews(sort)),
    tap(() => this.completedCasesLoading$.next(false))
  );

  constructor(private readonly caseService: CaseService) {
  }

  openCasesSortChange(sort: Sort): void {
    this.openCasesSort$.next(sort);
  }

  completedCasesSortChange(sort: Sort): void {
    this.completedCasesSort$.next(sort);
  }
}
