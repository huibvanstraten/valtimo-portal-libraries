import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderMenuComponent} from './header-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [HeaderMenuComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    TranslateModule
  ],
  exports: [HeaderMenuComponent]
})
export class HeaderMenuModule {
}
