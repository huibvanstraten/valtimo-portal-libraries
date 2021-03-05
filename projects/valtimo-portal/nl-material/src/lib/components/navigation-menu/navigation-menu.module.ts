import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationMenuComponent} from './navigation-menu.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  exports: [NavigationMenuComponent]
})
export class NavigationMenuModule {
}
