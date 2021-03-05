import {Component} from '@angular/core';
import {routes} from '@app/app-routing.module';
import {NavigationMenuItem} from '@valtimo-portal/nl-material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'valtimo-portal';
  navigationMenuItems: Array<NavigationMenuItem> = routes
    .filter((route) => !route.data?.hideInNav)
    .map((route) => ({link: String(route.path), title: String(route.data?.title)}));
}
