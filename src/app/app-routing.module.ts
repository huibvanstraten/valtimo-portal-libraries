import {Location} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PortalRoute} from '@app/interfaces';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader
} from "@gilsdav/ngx-translate-router";
import {TranslateService} from '@ngx-translate/core';


const routes: Array<PortalRoute> = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    data: {
      title: 'TITLES.home',
      icon: 'home',
      animation: 'HomePage'
    }
  },
  {
    path: 'notifications',
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
    data: {
      title: 'TITLES.notifications',
      icon: 'bell',
      animation: 'NotificationsPage'
    }
  },
  {
    path: 'cases', loadChildren: () => import('./modules/cases/cases.module').then(m => m.CasesModule),
    data: {
      title: 'TITLES.cases',
      icon: 'briefcase',
      animation: 'CasesPage'
    }
  },
  {
    path: 'tasks', loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    data: {
      title: 'TITLES.tasks',
      icon: 'tasks',
      animation: 'TasksPage'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), LocalizeRouterModule.forRoot(routes, {
    parser: {
      provide: LocalizeParser,
      useFactory: (translate: TranslateService, location: Location, settings: LocalizeRouterSettings) =>
        new ManualParserLoader(translate, location, settings, ['en', 'nl'], 'ROUTES.'),
      deps: [TranslateService, Location, LocalizeRouterSettings]
    }
  })],
  exports: [RouterModule]
})
class AppRoutingModule {
}

export {routes, AppRoutingModule};
