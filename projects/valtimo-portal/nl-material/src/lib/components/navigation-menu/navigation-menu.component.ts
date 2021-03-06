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
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SidenavService} from '../../services';

@Component({
  selector: 'nl-material-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('navLink') navLinks!: NavLinkElements;

  items$!: Observable<Array<NavigationMenuItem>>;

  currentUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  activeNavLinkIndicator$: BehaviorSubject<ActiveNavLinkIndicator> = new BehaviorSubject<ActiveNavLinkIndicator>({
    width: 0,
    offset: 0,
    previousOffset: 0
  });

  private routerSubscription!: Subscription;

  private navLinksSubscription!: Subscription;

  private breakPointSubscription!: Subscription;

  constructor(private router: Router, private observer: BreakpointObserver, private sidenavService: SidenavService) {
    this.items$ = this.sidenavService.items$;
  }

  ngOnInit(): void {
    this.openRouterSubscription();
  }

  ngAfterViewInit(): void {
    this.openNavLinksSubscription();
    this.openBreakpointSubscription();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
    this.navLinksSubscription?.unsubscribe();
    this.breakPointSubscription?.unsubscribe();
  }

  getTransitionDuration(indicator: ActiveNavLinkIndicator): string {
    const baseSpeed = 0.2;
    const difference = Math.abs(indicator.offset - indicator.previousOffset);
    const multiplier = difference / 150;
    return (Math.round((multiplier > 1 ? (baseSpeed * multiplier) : baseSpeed) * 100) / 100).toString();
  }

  private openBreakpointSubscription(): void {
    this.breakPointSubscription = this.observer.observe('(min-width: 600px)').subscribe(result => {
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
    this.navLinksSubscription = combineLatest([this.navLinks.changes, this.currentUrl$]).subscribe(([navLinks, currentUrl]) => {
      this.setActiveNavLink(navLinks, currentUrl);
    });
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


    if (activeElementWidth && (activeElementRelativeOffset || activeElementRelativeOffset === 0)) {
      this.activeNavLinkIndicator$.next({
        width: activeElementWidth,
        offset: activeElementRelativeOffset,
        previousOffset: this.activeNavLinkIndicator$.getValue().offset
      });
    }
  }
}
