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

import {Component, OnInit} from '@angular/core';
import {routes} from '@app/app-routing.module';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';
import {Router, RouterOutlet} from '@angular/router';
import {AppInitializationService, IconService, PageTitleService, routeAnimations} from '@valtimo-portal/pages';
import {environment} from '../environments/environment';
import {KeycloakService} from 'keycloak-angular';
import {from, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimations
  ]
})
export class AppComponent implements OnInit {
  readonly title = 'valtimo-portal';

  readonly imgSrc = environment.styling.logoImagePath;

  readonly navigationMenuItems!: Array<NavigationMenuItem>;

  readonly locales: Array<string> = environment.translation.supportedLocales;

  readonly isLoggedIn$: Observable<boolean> = from(this.keycloakService.isLoggedIn());

  constructor(
    private readonly router: Router,
    private readonly appInitializationService: AppInitializationService,
    private readonly keycloakService: KeycloakService,
    private readonly pageTitleService: PageTitleService,
    private readonly iconService: IconService
  ) {
    this.appInitializationService.navigateToEntryUrl(environment);
    this.navigationMenuItems = this.appInitializationService.getNavigationMenuItems(routes);

    if (environment.styling.faviconImagePath) {
      this.iconService.setFavicon(environment.styling.faviconImagePath);
    }
  }

  ngOnInit(): void {
    this.pageTitleService.setPageTitle();
  }

  prepareRoute(outlet: RouterOutlet): any {
    return this.appInitializationService.prepareRoute(outlet);
  }
}
