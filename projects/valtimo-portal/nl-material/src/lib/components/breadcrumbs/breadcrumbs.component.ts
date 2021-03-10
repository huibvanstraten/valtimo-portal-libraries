import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router, Routes} from "@angular/router";
import {BehaviorSubject, combineLatest, Subscription} from "rxjs";
import {Breadcrumb} from "../../interfaces";
import {SidenavService} from "../../services";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'nl-material-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({opacity: 0}),
        animate('200ms ease-in-out', style({opacity: 1}))
      ])
    ])
  ]
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  readonly breadCrumbs$ = new BehaviorSubject<Array<Breadcrumb>>([]);

  private routerSubscription!: Subscription;

  constructor(private router: Router, private sidenavService: SidenavService) {
  }

  ngOnInit(): void {
    this.routerSubscription = combineLatest([this.router.events, this.sidenavService.currentLang$])
      .subscribe(([event, currentLang]) => {
        const routes = this.router.config[0].children as Routes;
        if (event instanceof NavigationEnd) {
          this.breadCrumbs$.next(
            event.url.split('/').reduce((acc: Array<Breadcrumb>, curr) => {
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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
