import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuIconComponent} from './menu-icon.component';
import {SidenavServiceModule} from '../../services';

@NgModule({
  declarations: [MenuIconComponent],
  imports: [
    CommonModule,
    SidenavServiceModule
  ],
  exports: [MenuIconComponent]
})
export class MenuIconModule {
}
