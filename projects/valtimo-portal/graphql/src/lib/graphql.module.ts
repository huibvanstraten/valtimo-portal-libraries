import {Inject, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';
import {Environment} from "@valtimo-portal/shared";

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
    console.log(environment);
    apollo.create({
      link: httpLink.create({uri: 'https://graphql-voter-app.herokuapp.com/'}),
      cache: new InMemoryCache()
    });
  }
}
