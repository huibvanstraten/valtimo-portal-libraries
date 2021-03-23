import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserMenuComponent} from './user-menu.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {SidenavServiceModule} from '../../services';

@NgModule({
  declarations: [UserMenuComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    TranslateModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    SidenavServiceModule
  ],
  exports: [UserMenuComponent]
})
export class UserMenuModule {
}
