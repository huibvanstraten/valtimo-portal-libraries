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
import {NavigationEnd, Router, Routes} from '@angular/router';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {Breadcrumb} from '../../interfaces';
import {SidenavService} from '../../services';
import {animate, style, transition, trigger} from '@angular/animations';
import {Environment} from "@valtimo-portal/shared";

@Component({
  selector: 'nl-material-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  animations: [
    trigger('breadcrumbsFade', [
      transition('void => *', [
        style({opacity: 0, marginBottom: '-58px'}),
        animate('200ms 300ms ease-in-out', style({opacity: 1, marginBottom: 0}))
      ])
    ]),
    trigger('breadcrumbFade', [
      transition('void => *', [
        style({opacity: 0, marginLeft: '-16px'}),
        animate('200ms ease-in-out', style({opacity: 1, marginLeft: '0'}))
      ])
    ])
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  readonly breadCrumbs$ = new BehaviorSubject<Array<Breadcrumb>>([]);

  private routerSubscription!: Subscription;

  private environment: Environment;

  constructor(@Inject('environment') environment: Environment, private router: Router, private sidenavService: SidenavService) {
    this.environment = environment;
  }

  ngOnInit(): void {
    this.routerSubscription = combineLatest([this.router.events, this.sidenavService.currentLang$])
      .subscribe(([event]) => {
        const routes = this.router.config[0].children as Routes;
        if (event instanceof NavigationEnd) {
          this.breadCrumbs$.next(
            event.url
              .split('/')
              .reduce((acc: Array<Breadcrumb>, curr) => {
                if (curr) {
                  const findRoute = routes.find((route) => route.path === curr);
                  const previousLinks = acc.reduce((link, linkPart) => `${link}/${linkPart.link}`, '');
                  return [
                    ...acc,
                    {
                      link: `${previousLinks}/${curr}`.replace(/\/\//g, '/'),
                      title: findRoute ? findRoute.data?.title : routes[0] ? routes[0].data?.title : ''
                    }
                  ];
                }
                return acc;
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
