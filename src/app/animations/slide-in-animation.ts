import {animate, animateChild, group, query, style, transition, trigger} from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('* => HomePage, TasksPage => *, CasesPage => NotificationsPage', [
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
    transition('HomePage => *, * => TasksPage, NotificationsPage => CasesPage', [
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
  ]);
