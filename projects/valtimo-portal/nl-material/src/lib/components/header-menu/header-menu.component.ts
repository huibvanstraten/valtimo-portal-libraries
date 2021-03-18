/*
 * Copyright 2015-2021 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Component, Input} from '@angular/core';
import {LanguageSelectorMode} from "../../interfaces";
import {SidenavService} from "../../services";

@Component({
  selector: 'nl-material-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  @Input() locales: Array<string> = [];

  readonly dropdownMode = LanguageSelectorMode.dropdown;
  readonly toggleMode = LanguageSelectorMode.toggleButtons;

  constructor(private sidenavService: SidenavService) {
  }

  handleClick(): void {
    this.sidenavService.open = false;
  }
}
