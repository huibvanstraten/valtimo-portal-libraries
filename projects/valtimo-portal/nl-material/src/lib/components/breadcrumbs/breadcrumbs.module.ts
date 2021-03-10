import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {MatCardModule} from '@angular/material/card';
import {RouterModule} from "@angular/router";
import {SidenavServiceModule} from "../../services";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule,
    SidenavServiceModule,
    TranslateModule,
    MatIconModule
  ],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {
}
