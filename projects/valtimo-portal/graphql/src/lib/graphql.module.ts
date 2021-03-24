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
    @Inject('environment') environment: Environment,
    apollo: Apollo,
    httpLink: HttpLink
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
