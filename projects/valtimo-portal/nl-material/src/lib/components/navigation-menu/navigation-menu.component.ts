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

import {AfterViewInit, Component, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {ActiveNavLinkIndicator, NavigationMenuItem} from '../../interfaces';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, interval, Observable, Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SidenavService} from '../../services';
import {NavLinkElements} from '../../types';
import {finalize, take, tap, throttleTime} from 'rxjs/operators';

@Component({
  selector: 'nl-material-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewInit {
  @ViewChildren('navLink') navLinks!: NavLinkElements;

  items$!: Observable<Array<NavigationMenuItem>>;

  currentUrl$ = new BehaviorSubject<string>('');

  indicatorHidden$ = new BehaviorSubject<boolean>(true);

  private readonly emptyIndicator = {
    width: 0,
    offset: 0,
    previousOffset: 0,
    index: 0,
    textContent: '',
  };

  activeNavLinkIndicator$: BehaviorSubject<ActiveNavLinkIndicator> = new BehaviorSubject<ActiveNavLinkIndicator>(
    this.emptyIndicator
  );

  currentLang$!: Observable<string>;

  previousLang!: string;

  private routerSubscription!: Subscription;

  private navLinksSubscription!: Subscription;

  private breakPointSubscription!: Subscription;

  private intervalSubscription!: Subscription;

  private readonly indicatorBeforeLangSwitch$ = new BehaviorSubject<ActiveNavLinkIndicator>(this.emptyIndicator);

  constructor(
    private readonly router: Router,
    private readonly observer: BreakpointObserver,
    private readonly sidenavService: SidenavService
  ) {
    this.items$ = this.sidenavService.items$;
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  ngOnInit(): void {
    this.openRouterSubscription();
  }

  ngAfterViewInit(): void {
    this.openNavLinksSubscription();
    this.openBreakpointSubscription();
    this.showIndicator();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.navLinksSubscription?.unsubscribe();
    this.breakPointSubscription?.unsubscribe();
    this.intervalSubscription?.unsubscribe();
  }

  getTransitionDuration(indicator: ActiveNavLinkIndicator): string {
    const baseSpeed = 0.2;
    const difference = Math.abs(indicator.offset - indicator.previousOffset);
    const multiplier = difference / 150;
    return (Math.round((multiplier > 1 ? (baseSpeed * multiplier) : baseSpeed) * 100) / 100).toString();
  }

  getCoreUrl(url: string): string {
    const splitString = url.split('/');
    const urlPartLimit = 3;
    if (splitString.length <= urlPartLimit) {
      return url;
    } else {
      return `/${splitString.slice(0, urlPartLimit).reduce((acc, curr) => `${acc}/${curr}`, '')}/`;
    }
  }

  removeSlashes(text: string): string {
    return text.replace(/\\|\//g, '');
  }

  private openBreakpointSubscription(): void {
    this.breakPointSubscription = this.observer.observe('(min-width: 960px)').subscribe(result => {
      this.setActiveNavLink(this.navLinks, this.currentUrl$.getValue());
      if (result.matches) {
        this.sidenavService.open = false;
      }
    });
  }

  private openRouterSubscription(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      this.handleRouterEvent(event);
    });
  }

  private openNavLinksSubscription(): void {
    this.navLinksSubscription = combineLatest([this.navLinks.changes, this.currentUrl$, this.currentLang$])
      .pipe(
        throttleTime(100),
        tap(([navLinks, currentUrl, currentLang]) => {
          if (!this.previousLang || (this.previousLang === currentLang)) {
            this.setActiveNavLink(navLinks, currentUrl);
          } else {
            this.indicatorBeforeLangSwitch$.next(this.activeNavLinkIndicator$.getValue());
            this.hideIndicator();
            this.setActiveNavLinkWithDelay();
          }
          this.previousLang = currentLang;
        })
      )
      .subscribe();
  }

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationEnd) {
      this.currentUrl$.next(event.url);
    }
  }

  private setActiveNavLinkWithDelay(): void {
    this.intervalSubscription = interval(250)
      .pipe(
        take(10),
        finalize(() => {
          this.closeIntervalSubscription();
        })
      )
      .subscribe(() => {
        const current = this.activeNavLinkIndicator$.getValue();
        const beforeSwitch = this.indicatorBeforeLangSwitch$.getValue();
        const change = JSON.stringify(current) !== JSON.stringify(beforeSwitch);
        const indexSameAfterSwitch = beforeSwitch.index === current.index;

        if (change && indexSameAfterSwitch) {
          this.closeIntervalSubscription();
        } else {
          this.setActiveNavLink(this.navLinks, this.currentUrl$.getValue());
        }
      });
  }

  private setActiveNavLink(navLinks: NavLinkElements, currentUrl: string): void {
    const nativeElements = navLinks.toArray().map((link) => link.nativeElement);
    const elementLinks = nativeElements.map((element) => element.getAttribute('data-link'));
    const elementTextContents = this.navLinks.toArray().map(((link) => link.nativeElement.textContent));

    const currentElementIndex = elementLinks.findIndex((link) => (
      this.removeSlashes(`${link}`) === this.removeSlashes(this.getCoreUrl(currentUrl)))
    );

    const firstElementAbsoluteOffset = nativeElements[0]?.offsetLeft;

    const activeElement = nativeElements[currentElementIndex];
    const activeElementWidth = activeElement?.offsetWidth;
    const activeElementAbsolutetOffset = activeElement?.offsetLeft;
    const activeElementRelativeOffset = (activeElementAbsolutetOffset && firstElementAbsoluteOffset) ?
      (activeElementAbsolutetOffset - firstElementAbsoluteOffset) : 0;

    if (activeElementWidth && (activeElementRelativeOffset || activeElementRelativeOffset === 0)) {
      this.activeNavLinkIndicator$.next({
        width: activeElementWidth,
        offset: activeElementRelativeOffset,
        previousOffset: this.activeNavLinkIndicator$.getValue().offset,
        index: currentElementIndex,
        textContent: `${elementTextContents}`
      });
    }
  }

  private hideIndicator(): void {
    this.indicatorHidden$.next(true);
  }

  private showIndicator(): void {
    this.indicatorHidden$.next(false);
  }

  private closeIntervalSubscription(): void {
    this.intervalSubscription?.unsubscribe();
    this.showIndicator();
  }
}
