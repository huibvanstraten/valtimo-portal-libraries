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

import {AuthenticationProvider, Environment} from "@valtimo-portal/shared";

export const environment: Environment = {
  flags: {
    production: true,
  },
  styling: {
    logoImagePath: 'assets/img/logo/dh.svg'
  },
  translation: {
    supportedLocales: ['nl', 'en'],
    defaultLocaleIndex: 0,
    resources: [
      {prefix: './translate/', suffix: '.json'},
      {prefix: './translate/home/', suffix: '.json'},
      {prefix: './translate/cases/', suffix: '.json'},
      {prefix: './translate/definitions/form-example/', suffix: '.json'},
      {prefix: './translate/definitions/grant-application/', suffix: '.json'},
      {prefix: './translate/definitions/person/', suffix: '.json'},
      {prefix: './translate/definitions/test/', suffix: '.json'}
    ]
  },
  authentication: {
    provider: AuthenticationProvider.keycloak,
    config: {
      url: 'https://keycloak.valtimo.nl/auth',
      realm: 'valtimo',
      clientId: 'valtimo-console',
      redirectUri: '/keycloak/callback'
    }
  },
  api: {
    graphql: {
      clients: [
        {name: 'portal-api', uri: 'http://portaal.test.valtimo.nl/graphql'}
      ]
    }
  }
};
