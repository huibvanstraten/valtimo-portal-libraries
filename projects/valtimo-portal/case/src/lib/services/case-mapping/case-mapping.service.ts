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
import {CaseDetail, PortalCaseInstance} from '../../interfaces';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CaseMappingService {

  constructor(private readonly translateService: TranslateService) {
  }

  mapCaseInstanceToCaseDetails(caseInstance: PortalCaseInstance): Array<CaseDetail> {
    const submission: object = caseInstance.submission;
    const caseDetails: Array<CaseDetail> = [];
    const keysToFilter = ['submit'];

    const handleSubmissionLevel = (submissionLevel: object, level: number) => {
      const submissionLevelKeys = Object.keys(submissionLevel)
        .filter((key) => !keysToFilter.includes(key));

      submissionLevelKeys.forEach((key) => {
        const value = this.getCaseDetailValue(submissionLevel[key]);

        if (typeof value === 'string') {
          caseDetails.push({key, value, level});
        } else if (typeof value === 'object' && value !== null) {
          caseDetails.push({key, value: '', level, isHeading: true});
          handleSubmissionLevel(value, level + 1);
        }
      });
    };

    handleSubmissionLevel(submission, 0);

    return caseDetails;
  }

  private getCaseDetailValue(value: any): any {
    switch (value) {
      case 'true':
        return this.translateService.instant('case.true');
      case 'false':
        return this.translateService.instant('case.false');
      default:
        return value;
    }
  }
}
