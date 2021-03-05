import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationMenuComponent} from './navigation-menu.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [NavigationMenuComponent],
  imports: [
    MatToolbarModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [NavigationMenuComponent]
})
export class NavigationMenuModule {
}
