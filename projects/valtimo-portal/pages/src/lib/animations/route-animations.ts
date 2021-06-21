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

import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const routeAnimations =
  trigger('routeAnimations', [
    // Slide leftwards
    transition('* => HomePage, TasksPage => CasesPage, TaskPage => CasesPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({left: '-25%', opacity: 0})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '25%', opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('200ms ease-out', style({left: '0%', opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    // Slide rightwards
    transition('HomePage => *, CasesPage => TasksPage, NewCasePage => TasksPage, CasePage => TasksPage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({left: '25%', opacity: 0})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('200ms ease-out', style({left: '-25%', opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('200ms ease-out', style({left: '0%', opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
    // Fade only no slide
    transition('CasePage <=> *, NewCasePage <=> *, TaskPage <=> *', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          opacity: 1
        })
      ]),
      query(':enter', [
        style({opacity: 0})
      ]),
      query(':leave', animateChild(), {optional: true}),
      group([
        query(':leave', [
          animate('250ms ease-out', style({opacity: 0}))
        ], {optional: true}),
        query(':enter', [
          animate('250ms ease-out', style({opacity: 1}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
