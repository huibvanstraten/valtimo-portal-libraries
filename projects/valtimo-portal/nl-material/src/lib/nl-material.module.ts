import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    MatToolbarModule
  ],
  exports: [MatToolbarModule, ToolbarComponent],
  declarations: [ToolbarComponent],
})
export class NlMaterialModule { }
