import {animate, style, transition, trigger} from '@angular/animations';

export const fadeInAnimations =
  [
    trigger('fadeIn', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms ease-in-out', style({opacity: 1}))
      ])
    ])
  ];
