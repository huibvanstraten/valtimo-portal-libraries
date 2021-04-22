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

import {Component, ElementRef, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {SidenavService} from '../../services';
import {take} from 'rxjs/operators';

@Component({
  selector: 'nl-material-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
  @ViewChild('icon') iconRef!: ElementRef<HTMLDivElement>;

  open$!: Observable<boolean>;

  constructor(private readonly sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  handleClick(): void {
    this.sidenavService.open$.pipe(take(1)).subscribe((open) => {
      this.sidenavService.open = !open;
    });
  }
}
