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

import {Inject, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {Environment, GraphQLNamedClient} from '@valtimo-portal/shared';

@NgModule({
  exports: [
    HttpClientModule,
  ]
})
export class GraphQLModule {
  constructor(
    @Inject('environment') private readonly environment: Environment,
    private readonly apollo: Apollo,
    private readonly httpLink: HttpLink
  ) {
    environment?.api?.graphql?.clients?.forEach(
      (client: GraphQLNamedClient) => {
        apollo.createNamed(client.name, {
          link: httpLink.create({uri: client.uri}),
          cache: new InMemoryCache()
        });
      });
  }
}
