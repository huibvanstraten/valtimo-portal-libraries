import { NgModule } from '@angular/core';
import { NlMaterialComponent } from './nl-material.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [NlMaterialComponent, ToolbarComponent],
  imports: [
    MatToolbarModule
  ],
  exports: [NlMaterialComponent]
})
export class NlMaterialModule { }
