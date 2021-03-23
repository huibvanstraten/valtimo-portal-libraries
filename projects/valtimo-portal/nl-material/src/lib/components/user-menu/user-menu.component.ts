import {Component, Input, OnInit} from '@angular/core';
import {UserMenuMode} from "../../enums";
import {KeycloakService} from "keycloak-angular";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {map} from "rxjs/operators";
import {SidenavService} from "../../services";

@Component({
  selector: 'nl-material-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  @Input() mode!: UserMenuMode;

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

  constructor(
    private keycloakService: KeycloakService,
    private translateService: TranslateService,
    private sidenavService: SidenavService,
  ) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.keycloakService.loadUserProfile().then((profile) => {
      this.userFirstName$.next(`${profile.firstName}`);
    });
  }

  logout(): void {
    this.signingOut$.next(true);

    this.keycloakService.logout().then(() => {
      this.signingOut$.next(false);
    });
  }
}
