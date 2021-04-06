import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormApiService} from '@valtimo-portal/form';
import {BehaviorSubject, combineLatest, Subscription} from 'rxjs';
import {fadeInAnimations} from '../../animations';
import {SidenavService} from '../../services';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';

@Component({
  selector: 'nl-material-new-case-menu',
  templateUrl: './new-case-menu.component.html',
  styleUrls: ['./new-case-menu.component.scss'],
  animations: fadeInAnimations
})
export class NewCaseMenuComponent implements OnInit, OnDestroy {

  availableFormDefinitions$ = this.formApiService.getAllFormDefinitions();

  routeLangSubscription!: Subscription;

  readonly newCaseRoute$ = new BehaviorSubject<string>(this.getNewCaseRoute());

  constructor(
    private formApiService: FormApiService,
    private sidenavService: SidenavService,
    private localizeRouterService: LocalizeRouterService,
    private router: Router
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

  private getNewCaseRoute(): string {
    return `${this.localizeRouterService.translateRoute('/cases/newCase')}`;
  }
}
