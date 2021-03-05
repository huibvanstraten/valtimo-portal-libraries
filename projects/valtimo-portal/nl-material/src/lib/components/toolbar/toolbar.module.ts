import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    MatToolbarModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}