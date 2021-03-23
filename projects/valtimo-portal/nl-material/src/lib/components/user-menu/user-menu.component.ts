import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserMenuMode} from '../../enums';
import {KeycloakService} from 'keycloak-angular';
import {BehaviorSubject, combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {SidenavService} from '../../services';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'nl-material-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  @ViewChild('matSelect') matSelect!: MatSelect;

  @Input() mode!: UserMenuMode;
  @Input() close$!: Subject<any>;

  open$!: Observable<boolean>;

  readonly signingOut$ = new BehaviorSubject<boolean>(false);

  readonly userFirstName$ = new BehaviorSubject<string>('...');

  readonly welcomeText$ = combineLatest(
    [
      this.translateService.stream('headerMenu.welcome'),
      this.userFirstName$
    ]
  ).pipe(
    map(([welcomeText, firstName]) => `${welcomeText} ${firstName}`)
  );

  readonly mobileMode = UserMenuMode.mobile;
  readonly desktopMode = UserMenuMode.desktop;

  private closeMenuSubscription!: Subscription;

  constructor(
    private keycloakService: KeycloakService,
    private translateService: TranslateService,
    private sidenavService: SidenavService,
  ) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    if (this.close$) {
      this.openCloseSelectSubscription();
    }

    this.keycloakService.loadUserProfile().then((profile) => {
      this.userFirstName$.next(`${profile.firstName}`);
    });
  }

  ngOnDestroy(): void {
    this.closeMenuSubscription?.unsubscribe();
  }

  logout(): void {
    this.signingOut$.next(true);

    this.keycloakService.logout().then(() => {
      this.signingOut$.next(false);
    });
  }

  private openCloseSelectSubscription(): void {
    this.closeMenuSubscription = this.close$.subscribe(() => {
      this.matSelect?.close();
    });
  }
}
