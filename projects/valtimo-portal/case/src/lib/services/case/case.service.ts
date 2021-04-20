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
import {GetAllCaseDefinitionsGQL, GetAllCaseInstancesGQL, GetCaseInstanceGQL} from './queries';
import {catchError, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {CreateCaseGQL, CreateCaseMutation} from './mutations';
import {FetchResult} from '@apollo/client/core';
import {CaseDefinition, CaseInstance, Exact} from '@valtimo-portal/graphql';
import {GetAllCaseInstancesQuery} from './queries/get-all-case-instances/get-all-case-instances.graphql-gen';
import {QueryRef} from 'apollo-angular';
import {NotificationService} from '@valtimo-portal/shared';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private caseInstancesQueryRef!: QueryRef<GetAllCaseInstancesQuery, Exact<{ [key: string]: never; }>>;

  constructor(
    private readonly getAllCaseDefinitionsGQL: GetAllCaseDefinitionsGQL,
    private readonly getAllCaseInstancesGQL: GetAllCaseInstancesGQL,
    private readonly getCaseInstanceGQL: GetCaseInstanceGQL,
    private readonly createCaseGQL: CreateCaseGQL,
    private readonly notificationService: NotificationService,
    private readonly translateService: TranslateService
  ) {
  }

  getAllCaseDefinitions(): Observable<Array<CaseDefinition>> {
    return this.getAllCaseDefinitionsGQL.fetch()
      .pipe(
        map((res) => res.data.allCaseDefinitions)
      );
  }

  getAllCaseInstances(): Observable<Array<CaseInstance>> {
    if (!this.caseInstancesQueryRef) {
      this.caseInstancesQueryRef = this.getAllCaseInstancesGQL.watch();
    } else {
      this.caseInstancesQueryRef.refetch();
    }
    return this.caseInstancesQueryRef.valueChanges
      .pipe(
        map((res) => res.data.allCaseInstances)
      );
  }

  getCaseInstanceById(id: string): Observable<CaseInstance | null | undefined> {
    return this.getCaseInstanceGQL.fetch({id}).pipe(
      map((res) => res.data.getCaseInstance),
      catchError(() => {
          this.notificationService.show(this.translateService.instant('case.noDataError'));
          return of(undefined);
        }
      )
    );
  }

  submitCase(submission: any, caseDefinitionId: string): Observable<FetchResult<CreateCaseMutation>> {
    return this.createCaseGQL.mutate({submission, caseDefinitionId});
  }
}
