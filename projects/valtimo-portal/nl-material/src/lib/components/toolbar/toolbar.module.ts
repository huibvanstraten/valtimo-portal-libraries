import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    MatToolbarModule,
    CommonModule
  ],
  exports: [ToolbarComponent]
})
export class ToolbarModule {
}
