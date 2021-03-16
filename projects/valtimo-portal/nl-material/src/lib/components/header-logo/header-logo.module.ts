import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderLogoComponent} from './header-logo.component';
import {RouterModule} from "@angular/router";
import {SidenavServiceModule} from "../../services";

@NgModule({
  declarations: [HeaderLogoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidenavServiceModule
  ],
  exports: [HeaderLogoComponent]
})
export class HeaderLogoModule {
}
