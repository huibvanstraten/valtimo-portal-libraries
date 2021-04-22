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

import {Injectable, OnDestroy} from '@angular/core';
import {CaseService} from '@valtimo-portal/case';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {SidenavService} from '../sidenav';
import {Tip} from '../../interfaces';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipsService implements OnDestroy {

  private _tips$ = new BehaviorSubject<Array<Tip>>([]);

  private currentLangSubscription!: Subscription;

  private readonly tipsLimit: number = 5;

  constructor(
    private readonly caseService: CaseService,
    private readonly translateService: TranslateService,
    private readonly sidenavService: SidenavService
  ) {
    this.currentLangSubscription =
      combineLatest(
        [this.sidenavService.currentLang$, this.caseService.getAllCaseDefinitions()]
      )
        .subscribe(([currentLang, caseDefinitions]) => {
          this.translateService.getTranslation(currentLang).pipe(take(1))
            .subscribe((currentTranslation) => {
              const caseDefinitionIds = caseDefinitions.map((definition) => definition.id);
              const tips: Array<Tip> = [];

              caseDefinitionIds.forEach((caseDefinitionId) => {
                const definitionTranslation = currentTranslation[caseDefinitionId];
                const definitionTranslationTips = definitionTranslation?.tips;

                if (definitionTranslationTips) {
                  definitionTranslationTips.forEach((tip) => {
                    tips.push({caseDefinitionId, body: tip});
                  });
                }
              });

              this._tips$.next(this.shuffleArray(tips).slice(0, this.tipsLimit));
            });
        });
  }

  ngOnDestroy(): void {
    this.currentLangSubscription.unsubscribe();
  }

  get tips$(): Observable<Array<Tip>> {
    return this._tips$.asObservable();
  }

  private shuffleArray(array: Array<any>): Array<any> {
    const arrayCopy = [...array];
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy;
  }

}
