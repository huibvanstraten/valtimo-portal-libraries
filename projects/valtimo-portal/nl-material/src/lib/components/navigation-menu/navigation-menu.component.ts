import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChildren
} from '@angular/core';
import {ActiveNavLinkIndicator, NavigationMenuItem, NavLinkElements} from '../../interfaces';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'nl-material-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('navLink') navLinks!: NavLinkElements;

  @Input() items!: Array<NavigationMenuItem>;

  currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  activeNavLinkIndicator$: BehaviorSubject<ActiveNavLinkIndicator> = new BehaviorSubject<ActiveNavLinkIndicator>({
    width: 0,
    offset: 0,
    previousOffset: 0
  });

  private routerSubscription!: Subscription;

  private navLinksSubscription!: Subscription;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      this.handleRouterEvent(event);
    });
  }

  ngAfterViewInit(): void {
    this.navLinksSubscription = combineLatest([this.navLinks.changes, this.currentUrl$]).subscribe(([navLinks, currentUrl]) => {
      this.setActiveNavLink(navLinks, currentUrl);
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.navLinksSubscription?.unsubscribe();
  }

  getTransitionDuration(indicator: ActiveNavLinkIndicator): string {
    const baseSpeed = 0.2;
    const difference = Math.abs(indicator.offset - indicator.previousOffset);
    const multiplier = difference / 150;
    return (Math.round((multiplier > 1 ? (baseSpeed * multiplier) : baseSpeed) * 100) / 100).toString();
  }

  private handleRouterEvent(event: Event): void {
    if (event instanceof NavigationEnd) {
      this.currentUrl$.next(event.url);
    }
  }

  private setActiveNavLink(navLinks: NavLinkElements, currentUrl: string): void {
    const nativeElements = navLinks.toArray().map((link) => link.nativeElement);
    const elementLinks = nativeElements.map((element) => element.getAttribute('title'));

    const currentLink = currentUrl.substring(1);
    const currentElementIndex = elementLinks.findIndex((link) => link === currentLink);

    const firstElementAbsoluteOffset = nativeElements[0]?.offsetLeft;

    const activeElement = nativeElements[currentElementIndex];
    const activeElementWidth = activeElement?.offsetWidth;
    const activeElementAbsolutetOffset = activeElement?.offsetLeft;
    const activeElementRelativeOffset = (activeElementAbsolutetOffset && firstElementAbsoluteOffset) ?
      (activeElementAbsolutetOffset - firstElementAbsoluteOffset) : 0;

    this.activeNavLinkIndicator$.next({
      width: activeElementWidth,
      offset: activeElementRelativeOffset,
      previousOffset: this.activeNavLinkIndicator$.getValue().offset
    });
  }

}
