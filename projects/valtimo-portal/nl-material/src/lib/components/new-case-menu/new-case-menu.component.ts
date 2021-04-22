import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {fadeInAnimations} from '../../animations';
import {SidenavService} from '../../services';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';
import {CaseService} from '@valtimo-portal/case';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'nl-material-new-case-menu',
  templateUrl: './new-case-menu.component.html',
  styleUrls: ['./new-case-menu.component.scss'],
  animations: fadeInAnimations
})
export class NewCaseMenuComponent implements OnInit, OnDestroy {

  loading$ = new BehaviorSubject<boolean>(true);

  allCaseDefinitions$ = this.caseService.getAllCaseDefinitions()
    .pipe(
      tap(() => this.loading$.next(false))
    );

  routeLangSubscription!: Subscription;

  readonly newCaseRoute$ = new BehaviorSubject<string>(this.getNewCaseRoute());

  constructor(
    private readonly caseService: CaseService,
    private readonly sidenavService: SidenavService,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.routeLangSubscription =
      combineLatest([this.sidenavService.currentLang$, this.router.events])
        .subscribe(() => {
          this.setNewCaseRoute();
        });
  }

  ngOnDestroy(): void {
    this.routeLangSubscription.unsubscribe();
  }

  private setNewCaseRoute(): void {
    this.newCaseRoute$.next(
      this.getNewCaseRoute()
    );
  }

  getNewCaseRoute(): string {
    return `${this.localizeRouterService.translateRoute('/cases/newCase')}`;
  }
}
