import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
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
      title: titles.home,
      icon: 'home',
      animation: 'HomePage'
    }
  },
  {
    path: getPath(titles.notifications),
    loadChildren: () => import('./modules/notifications/notifications.module').then(m => m.NotificationsModule),
    data: {
      title: titles.notifications,
      icon: 'bell',
      animation: 'NotificationsPage'
    }
  },
  {
    path: getPath(titles.cases), loadChildren: () => import('./modules/cases/cases.module').then(m => m.CasesModule),
    data: {
      title: titles.cases,
      icon: 'briefcase',
      animation: 'CasesPage'
    }
  },
  {
    path: getPath(titles.tasks), loadChildren: () => import('./modules/tasks/tasks.module').then(m => m.TasksModule),
    data: {
      title: titles.tasks,
      icon: 'tasks',
      animation: 'TasksPage'
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
