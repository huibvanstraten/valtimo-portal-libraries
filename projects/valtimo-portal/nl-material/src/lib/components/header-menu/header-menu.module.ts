import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderMenuComponent} from './header-menu.component';
import {TranslateModule} from "@ngx-translate/core";
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from "@angular/forms";
import {SidenavServiceModule} from "../../services";

@NgModule({
  declarations: [HeaderMenuComponent],
  imports: [
    CommonModule,
    MatSelectModule,
    TranslateModule,
    FormsModule,
    SidenavServiceModule
  ],
  exports: [HeaderMenuComponent]
})
export class HeaderMenuModule {
}
