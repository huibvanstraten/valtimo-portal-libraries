import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidenavComponent} from './sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {SidenavServiceModule} from '../../services';
import {MatListModule} from '@angular/material/list';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    SidenavServiceModule,
    RouterModule,
    MatIconModule
  ],
  exports: [SidenavComponent]
})
export class SidenavModule {
}
