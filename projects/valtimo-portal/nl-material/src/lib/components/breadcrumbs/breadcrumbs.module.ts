import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BreadcrumbsComponent} from './breadcrumbs.component';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [
    CommonModule,
    MatCardModule,
  ],
  exports: [BreadcrumbsComponent]
})
export class BreadcrumbsModule {
}
