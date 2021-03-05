import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PortalRoute} from '@app/interfaces';

const titles: { [key: string]: string } = {
  home: 'Home',
  notifications: 'Meldingen',
  cases: 'Aanvragen',
  tasks: 'Taken'
};

const getPath = (title: string) => title.toLowerCase();

const routes: Array<PortalRoute> = [
  {
    path: '', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    data: {
      title: titles.home
    }
  },
  {
    path: getPath(titles.notifications),
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
    data: {
      title: titles.notifications
    }
  },
  {
    path: getPath(titles.cases), loadChildren: () => import('./modules/cases/cases.module').then(m => m.CasesModule),
    data: {
      title: titles.cases
    }
  },
  {
    path: getPath(titles.tasks), loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    data: {
      title: titles.tasks
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
class AppRoutingModule {
}

export {routes, AppRoutingModule};
