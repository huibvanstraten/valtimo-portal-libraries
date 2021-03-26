import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormApiService} from '@valtimo-portal/form';
import {BehaviorSubject, Subscription} from 'rxjs';
import {fadeInAnimations} from '../../animations';
import {SidenavService} from '../../services';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'nl-material-new-case-menu',
  templateUrl: './new-case-menu.component.html',
  styleUrls: ['./new-case-menu.component.scss'],
  animations: fadeInAnimations
})
export class NewCaseMenuComponent implements OnInit, OnDestroy {

  availableFormDefinitions$ = this.formApiService.getAvailableFormDefinitions();

  currentLangSubscription!: Subscription;

  readonly newCaseRoute$ = new BehaviorSubject<string>('');

  constructor(
    private formApiService: FormApiService,
    private sidenavService: SidenavService,
    private localizeRouterService: LocalizeRouterService
  ) {
  }

  ngOnInit(): void {
    this.currentLangSubscription = this.sidenavService.currentLang$.subscribe((currentLang) => {
      console.log('current', currentLang);
      this.newCaseRoute$.next(
        `${this.localizeRouterService.translateRoute('/cases/new-case')}`
      );

      console.log(this.newCaseRoute$.getValue());
    });
  }

  ngOnDestroy(): void {
    this.currentLangSubscription.unsubscribe();
  }
}
