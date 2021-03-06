import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationMenuComponent} from './navigation-menu.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {MenuIconModule} from '../menu-icon';
import {LayoutModule} from '@angular/cdk/layout';
import {SidenavServiceModule} from '../../services';

@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    MenuIconModule,
    LayoutModule,
    SidenavServiceModule
  ],
  exports: [NavigationMenuComponent]
})
export class NavigationMenuModule {
}
