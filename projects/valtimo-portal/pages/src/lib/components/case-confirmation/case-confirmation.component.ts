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
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {BreadcrumbsService, SidenavService} from '@valtimo-portal/nl-material';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute, Router} from '@angular/router';
import {KeycloakService} from 'keycloak-angular';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'page-case-confirmation',
  templateUrl: './case-confirmation.component.html',
  styleUrls: ['./case-confirmation.component.scss']
})
export class CaseConfirmationComponent implements OnInit, OnDestroy {
  loading$ = new BehaviorSubject<boolean>(true);

  caseDefinitionId$ = this.route.queryParams.pipe(
    map((params) => params?.id),
  );

  caseId$ = this.route.queryParams.pipe(
    map((params) => params?.caseId),
  );

  readonly userEmail$ = new BehaviorSubject<string>('');

  private routeLangSubscription!: Subscription;

  readonly caseRoute$ = new BehaviorSubject<string>(this.getCaseRoute());

  private readonly breadcrumbPosition = 3;
  private readonly previousBreadcrumbPosition = 2;

  constructor(
    private readonly breadcrumbsService: BreadcrumbsService,
    private readonly translateService: TranslateService,
    private readonly route: ActivatedRoute,
    private readonly sidenavService: SidenavService,
    private readonly router: Router,
    private readonly keycloakService: KeycloakService,
    private readonly localizeRouterService: LocalizeRouterService,
  ) {
  }

  ngOnInit(): void {
    this.setBreadcrumbTitle();
    this.openRouteLangSubscription();
    this.setUserEmail();
  }

  ngOnDestroy(): void {
    this.routeLangSubscription?.unsubscribe();
    this.breadcrumbsService.clearBreadcrumbReplacement(this.previousBreadcrumbPosition);
    this.breadcrumbsService.clearBreadcrumbReplacement(this.breadcrumbPosition);
  }

  openRouteLangSubscription(): void {
    this.routeLangSubscription =
      combineLatest([this.sidenavService.currentLang$, this.router.events])
        .subscribe(() => {
          this.setBreadcrumbTitle();
          this.setCaseRoute();
        });
  }

  private getCaseRoute(): string {
    return `${this.localizeRouterService.translateRoute('/cases/case')}`;
  }

  private setCaseRoute(): void {
    this.caseRoute$.next(this.getCaseRoute());
  }

  private setUserEmail(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      if (profile?.email) {
        this.userEmail$.next(profile?.email);
      }

      this.loading$.next(false);
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
