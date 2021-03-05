import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NavigationMenuItem} from '../../interfaces';
import {NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Subscription} from 'rxjs';

@Component({
  selector: 'nl-material-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnDestroy {

  @Input() items: Array<NavigationMenuItem> = [];

  currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private routerSubscription: Subscription = Subscription.EMPTY;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl$.next(event.url);
      }
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }

}
