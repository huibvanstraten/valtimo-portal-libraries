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

import {Component} from '@angular/core';
import {routes} from '@app/app-routing.module';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';
import {Router, RouterOutlet} from '@angular/router';
import {slideInAnimation} from '@app/animations';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  readonly title = 'valtimo-portal';
  readonly imgSrc = environment.styling.logoImagePath;

  readonly navigationMenuItems: Array<NavigationMenuItem> = routes
    .filter((route) => !route.data?.hideInNav)
    .map((route) => ({
      link: String(route.path),
      title: String(route.data?.title),
      icon: String(route.data?.icon),
      isHome: route.data?.isHome
    }));

  readonly locales: Array<string> = environment.translation.supportedLocales;

  constructor(
    private readonly router: Router
  ) {
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
