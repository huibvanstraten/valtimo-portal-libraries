import { NgModule } from '@angular/core';
import { NlMaterialComponent } from './nl-material.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [NlMaterialComponent],
  imports: [
    MatToolbarModule
  ],
  exports: [NlMaterialComponent]
})
export class NlMaterialModule { }
