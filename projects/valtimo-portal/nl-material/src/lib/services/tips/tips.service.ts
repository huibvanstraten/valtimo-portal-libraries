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

import {Injectable} from '@angular/core';
import {CaseService} from '@valtimo-portal/case';
import {TranslateService} from '@ngx-translate/core';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipsService {

  allCaseDefinitions$ = this.caseService.getAllCaseDefinitions();

  constructor(private readonly caseService: CaseService, private readonly translateService: TranslateService) {
    this.translateService.getTranslation('en').pipe(take(1)).subscribe((trans) => console.log(trans));
  }
}
