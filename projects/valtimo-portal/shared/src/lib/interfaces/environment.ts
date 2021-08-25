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

import {Authentication} from '../types';
import {GraphQLNamedClient} from './graphql';
import {ITranslationResource} from 'ngx-translate-multi-http-loader';
import {ComponentType} from '@angular/cdk/overlay';
import {FormioAppConfig} from '@formio/angular';
import {Injector} from '@angular/core';

export interface Environment {
  flags: {
    production: boolean;
  };
  translation: {
    supportedLocales: Array<string>;
    defaultLocaleIndex?: number;
    resources: Array<ITranslationResource>
  };
  styling: {
    logoImagePath: string;
    faviconImagePath?: string;
  };
  authentication: Authentication;
  api: {
    graphql: {
      clients: Array<GraphQLNamedClient>
    }
  };
  viewOverrides?: {
    caseDetails?: ComponentType<any>;
  };
  formioAppConfig: FormioAppConfig;
  customFormioComponentRegistrations?: Array<{ selector: string; function: (injector: Injector) => void }>;
}
