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

import {KeycloakService} from 'keycloak-angular';
import {Environment} from '@valtimo-portal/shared';

export const initializeKeycloak = (keycloak: KeycloakService, environment: Environment) => {
  const config = environment.authentication.config;

  return () =>
    keycloak.init({
      config,
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: false,
        flow: 'standard',
        redirectUri: `${config.redirectUri}`
      },
    });
};
