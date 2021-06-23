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
import {Environment, PortalRoute} from '@valtimo-portal/shared';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';
import {Router, RouterOutlet} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {registerLocaleData} from '@angular/common';
import localeNl from '@angular/common/locales/nl';
import localeEn from '@angular/common/locales/en';

@Injectable({
  providedIn: 'root'
})
export class AppInitializationService {

  constructor(
    private readonly router: Router,
    private readonly translateService: TranslateService
  ) {
  }

  initializeAppModule(environment: Environment): void {
    const translationEnv = environment.translation;
    const defaultLocaleIndex = translationEnv.defaultLocaleIndex || 0;
    const href = window.location.href;

    this.translateService.setDefaultLang(translationEnv.supportedLocales[defaultLocaleIndex]);

    environment.translation.supportedLocales.forEach((locale) => {
      switch (locale) {
        case 'nl':
          registerLocaleData(localeNl, 'nl');
          break;
        case 'en':
          registerLocaleData(localeEn, 'en');
          break;
      }
    });

    if (!href.toLowerCase().includes('callback') && !href.toLowerCase().includes('#state')) {
      sessionStorage.setItem(`${environment.authentication.config.entryUrlStorageKey}`, href);
    }
  }

  getNavigationMenuItems(routes: Array<PortalRoute>): Array<NavigationMenuItem> {
    return routes
      .filter((route) => !route.data?.hideInNav)
      .map((route) => ({
        link: String(route.path),
        title: String(route.data?.title),
        icon: String(route.data?.icon),
        isHome: route.data?.isHome
      }));
  }

  navigateToEntryUrl(environment: Environment): void {
    const entryUrlStorageKey = `${environment.authentication.config.entryUrlStorageKey}`;
    const entryUrl = sessionStorage.getItem(entryUrlStorageKey);
    const entryUrlRouterLink = entryUrl?.split(window.location.host)[1];

    if (environment.authentication.config.redirectToEntryUrl && entryUrlRouterLink) {
      this.router.navigateByUrl(entryUrlRouterLink);
    }

    sessionStorage.removeItem(entryUrlStorageKey);
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
