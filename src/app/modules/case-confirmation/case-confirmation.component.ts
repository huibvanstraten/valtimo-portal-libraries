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
import {BehaviorSubject, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {BreadcrumbsService} from '@valtimo-portal/nl-material';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-case-confirmation',
  templateUrl: './case-confirmation.component.html',
  styleUrls: ['./case-confirmation.component.scss']
})
export class CaseConfirmationComponent implements OnInit, OnDestroy {
  loading$ = new BehaviorSubject<boolean>(true);

  private langChangeSubscription!: Subscription;

  private readonly breadcrumbPosition = 3;
  private readonly previousBreadcrumbPosition = 2;

  constructor(
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService,
    private readonly route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.setBreadcrumbTitle();
    this.openLangChangeSubscription();
  }

  ngOnDestroy(): void {
    this.langChangeSubscription?.unsubscribe();
    this.breadcrumbsService.clearBreadcrumbReplacement(this.previousBreadcrumbPosition);
    this.breadcrumbsService.clearBreadcrumbReplacement(this.breadcrumbPosition);
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
        this.setCurrentBreadcrumbTitle(params?.id);
        this.setPreviousBreadcrumbTitle(params?.id);
      }
    );
  }

  private setCurrentBreadcrumbTitle(id: string): void {
    this.breadcrumbsService.setBreadcrumbReplacement(
      {
        positionInUrl: this.breadcrumbPosition,
        replacementTitle: this.translateService.instant(
          `${id}.confirmed`
        )
      }
    );
  }

  private setPreviousBreadcrumbTitle(id: string): void {
    this.breadcrumbsService.setBreadcrumbReplacement(
      {
        positionInUrl: this.previousBreadcrumbPosition,
        replacementTitle: this.translateService.instant(
          `${id}.new`
        ),
        parameter: {
          key: 'id',
          value: id
        }
      }
    );
  }
}
