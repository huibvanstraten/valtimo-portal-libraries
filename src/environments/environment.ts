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

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {AuthenticationProvider, Environment} from '@valtimo-portal/shared';

export const environment: Environment = {
  flags: {
    production: false,
  },
  styling: {
    logoImagePath: 'assets/img/logo/dh.svg'
  },
  translation: {
    supportedLocales: ['nl', 'en'],
    defaultLocaleIndex: 0
  },
  authentication: {
    provider: AuthenticationProvider.keycloak,
    config: {
      url: 'https://keycloak.test.valtimo.nl/auth',
      realm: 'valtimo',
      clientId: 'valtimo-console',
      redirectUri: '/keycloak/callback'
    }
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
