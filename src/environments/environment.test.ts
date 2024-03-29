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

import {AuthenticationProvider, defaultTranslationResources, Environment} from "@valtimo-portal/shared";

export const environment: Environment = {
  flags: {
    production: true,
  },
  styling: {
    logoImagePath: 'assets/img/logo/dh.svg',
    faviconImagePath: 'https://www.valtimo.nl/wp-content/uploads/valtimo-fav.png'
  },
  translation: {
    supportedLocales: ['nl', 'en'],
    defaultLocaleIndex: 0,
    resources: [
      ...defaultTranslationResources,
      {prefix: './custom-translate/definitions/form-example/', suffix: '.json'},
      {prefix: './custom-translate/definitions/grant-application/', suffix: '.json'},
      {prefix: './custom-translate/definitions/person/', suffix: '.json'},
      {prefix: './custom-translate/definitions/test/', suffix: '.json'},
      {prefix: './custom-translate/definitions/bezwaar/', suffix: '.json'}
    ]
  },
  authentication: {
    provider: AuthenticationProvider.keycloak,
    config: {
      url: 'https://keycloak.valtimo.nl/auth',
      realm: 'valtimo',
      clientId: 'valtimo-console-test',
      redirectUri: 'https://portal.test.valtimo.nl/keycloak/callback',
      redirectToEntryUrl: true,
      entryUrlStorageKey: 'entryUrl'
    }
  },
  api: {
    graphql: {
      clients: [
        {name: 'portal-api', uri: 'https://portal.test.valtimo.nl/graphql'}
      ]
    }
  },
  formioAppConfig: {
    appUrl: 'https://portal.test.valtimo.nl',
    apiUrl: 'https://portal.test.valtimo.nl'
  }
};
