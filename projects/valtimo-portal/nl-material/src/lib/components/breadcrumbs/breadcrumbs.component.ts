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

import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {Breadcrumb} from '../../interfaces';
import {SidenavService} from '../../services';
import {Environment} from '@valtimo-portal/shared';
import {breadcrumbsAnimations} from '../../animations';

@Component({
  selector: 'nl-material-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  animations: breadcrumbsAnimations
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  readonly breadCrumbs$ = new BehaviorSubject<Array<Breadcrumb>>([]);

  private routerSubscription!: Subscription;

  private environment: Environment;

  constructor(
    @Inject('environment') environment: Environment,
    private router: Router,
    private sidenavService: SidenavService,
    private route: ActivatedRoute
  ) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.routerSubscription = combineLatest([this.router.events, this.sidenavService.currentLang$])
      .subscribe(([event]) => {
        if (event instanceof NavigationEnd) {
          const snapshot = this.route.snapshot;
          const snapshotRoutes: Array<ActivatedRouteSnapshot> = [];

          const pushChildrenToArray = (routeSnapshot: ActivatedRouteSnapshot) => {
            const children = routeSnapshot.children;
            if (children.length > 0) {
              children.forEach((child) => {
                snapshotRoutes.push(child);
                pushChildrenToArray(child);
              });
            }
          };

          pushChildrenToArray(snapshot);

          const snapshotsWithPath = snapshotRoutes.filter((route) => route.routeConfig?.path);

          this.breadCrumbs$.next(
            snapshotsWithPath.reduce((acc: Array<Breadcrumb>, curr, index) => {
              return [
                ...acc,
                {
                  link: `${index !== 0 ? acc[index - 1].link : ''}/${curr.routeConfig?.path}`,
                  title: curr.data?.title
                }
              ] as Array<Breadcrumb>;
            }, [])
          );
        }
      });
  }

  isKeycloakCallback(breadcrumbs: Array<Breadcrumb>): boolean {
    return breadcrumbs[breadcrumbs.length - 1].link.includes(this.environment.authentication.config.redirectUri);
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
