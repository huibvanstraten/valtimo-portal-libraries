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

import {AuthenticationProvider, Environment} from '@app/interfaces';

export const environment: Environment = {
  flags: {
    production: true,
  },
  styling: {
    logoImagePath: 'assets/img/logo/dh.svg'
  },
  authentication: {
    provider: AuthenticationProvider.keycloak,
    config: {
      url: 'https://keycloak.test.valtimo.nl/auth',
      realm: 'valtimo',
      clientId: 'valtimo-console'
    }
  }
};
