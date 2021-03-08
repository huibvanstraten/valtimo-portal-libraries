import {Component} from '@angular/core';
import {routes} from '@app/app-routing.module';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';
import {RouterOutlet} from "@angular/router";
import {slideInAnimation} from "@app/animations";

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
    .map((route) => ({link: String(route.path), title: String(route.data?.title), icon: String(route.data?.icon)}));

  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
