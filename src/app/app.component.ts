import {Component} from '@angular/core';
import {routes} from '@app/app-routing.module';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "@app/animations";
import {LocalizeRouterService} from "@gilsdav/ngx-translate-router";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'valtimo-portal';

  navigationMenuItems: Array<NavigationMenuItem> = routes
    .filter((route) => !route.data?.hideInNav)
    .map((route) => ({
      link: `${this.translateService.currentLang}/${this.localizeRouterService.translateRoute(String(route.path))}`,
      title: String(route.data?.title),
      icon: String(route.data?.icon)
    }));

  constructor(private localizeRouterService: LocalizeRouterService, private translateService: TranslateService) {
  }

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
