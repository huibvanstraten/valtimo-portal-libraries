import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidenavServiceModule} from '../../services';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    SidenavServiceModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule {
}
