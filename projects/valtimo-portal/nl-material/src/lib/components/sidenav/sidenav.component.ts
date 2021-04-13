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

import {Component, Input, OnInit} from '@angular/core';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';

@Component({
  selector: 'nl-material-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  @Input() items!: Array<NavigationMenuItem>;

  items$!: Observable<Array<NavigationMenuItem>>;

  open$!: Observable<boolean>;

  constructor(private readonly sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  ngOnInit(): void {
    this.sidenavService.items = this.items;
    this.items$ = this.sidenavService.items$;
  }

  onOpenedChange(opened: boolean = false): void {
    this.sidenavService.open = opened;
  }
}
