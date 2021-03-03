import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NlMaterialModule} from '@valtimo-portal/nl-material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NlMaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
