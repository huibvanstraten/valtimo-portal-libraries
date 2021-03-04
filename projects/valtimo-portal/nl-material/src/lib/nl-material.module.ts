import {NgModule} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {ToolbarComponent} from './components';

@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [MatToolbarModule, MatButtonModule, ToolbarComponent],
  declarations: [ToolbarComponent],
})
export class NlMaterialModule { }
