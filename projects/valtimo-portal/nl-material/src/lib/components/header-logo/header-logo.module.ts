import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderLogoComponent} from './header-logo.component';
import {RouterModule} from "@angular/router";
import {SidenavServiceModule} from "../../services";
import {FlexLayoutModule} from "@angular/flex-layout";

@NgModule({
  declarations: [HeaderLogoComponent],
  imports: [
    CommonModule,
    RouterModule,
    SidenavServiceModule,
    FlexLayoutModule
  ],
  exports: [HeaderLogoComponent]
})
export class HeaderLogoModule {
}
