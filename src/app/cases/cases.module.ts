import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CasesRoutingModule} from './cases-routing.module';
import {CasesComponent} from './cases.component';
import {NlMaterialModule} from '@valtimo-portal/nl-material';


@NgModule({
  declarations: [CasesComponent],
  imports: [
    CommonModule,
    CasesRoutingModule,
    NlMaterialModule
  ]
})
export class CasesModule {
}
