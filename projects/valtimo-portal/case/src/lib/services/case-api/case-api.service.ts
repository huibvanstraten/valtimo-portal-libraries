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
import {GetAllCaseDefinitionsGQL, GetAllCaseInstancesGQL} from './queries';
import {map} from 'rxjs/operators';
import {AvailableCaseDefinition} from '../../interfaces';
import {Observable} from 'rxjs';
import {SubmitCaseGQL, SubmitCaseMutation} from './mutations';
import {FetchResult} from '@apollo/client/core';
import {CaseInstance} from '@valtimo-portal/graphql';
import {GetAllCaseInstancesQuery} from "./queries/get-all-case-instances/get-all-case-instances.graphql-gen";
import {QueryRef} from "apollo-angular";

@Injectable({
  providedIn: 'root'
})
export class CaseApiService {

  caseInstancesQueryRef!: QueryRef<GetAllCaseInstancesQuery>;

  constructor(
    private readonly getAllCaseDefinitionsGQL: GetAllCaseDefinitionsGQL,
    private readonly getAllCaseInstancesGQL: GetAllCaseInstancesGQL,
    private readonly submitCaseGQL: SubmitCaseGQL
  ) {
  }

  getAllCaseDefinitions(): Observable<Array<AvailableCaseDefinition>> {
    return this.getAllCaseDefinitionsGQL.fetch()
      .pipe(
        map((res) => res.data.allCaseDefinitions.map((definition) => ({
          name: definition.id,
          schema: definition.schema
        })))
      );
  }

  getAllCaseInstances(): Observable<Array<CaseInstance>> {
    if (!this.caseInstancesQueryRef) {
      // @ts-ignore
      this.caseInstancesQueryRef = this.getAllCaseInstancesGQL.watch();
    } else {
      this.caseInstancesQueryRef.refetch();
    }
    return this.caseInstancesQueryRef.valueChanges
      .pipe(
        map((res) => res.data.allCaseInstances)
      );
  }

  submitCase(submission: any, caseDefinitionId: string): Observable<FetchResult<SubmitCaseMutation>> {
    return this.submitCaseGQL.mutate({submission, caseDefinitionId});
  }
}
