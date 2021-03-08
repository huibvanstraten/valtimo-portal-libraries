import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderMenuModule, NavigationMenuModule, SidenavModule, ToolbarModule} from '@valtimo-portal/nl-material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';

export const HttpLoaderFactory = (http: HttpClient) => new MultiTranslateHttpLoader(http, [
  {prefix: './translate/', suffix: '.json'}
]);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    ToolbarModule,
    NavigationMenuModule,
    SidenavModule,
    HeaderMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('nl');
  }
}
