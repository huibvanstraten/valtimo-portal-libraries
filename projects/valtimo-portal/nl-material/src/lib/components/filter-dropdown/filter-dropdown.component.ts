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

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DropdownOption} from '../../interfaces';

@Component({
  selector: 'nl-material-filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.scss']
})
export class FilterDropdownComponent implements OnInit {
  @Input() disabled = false;
  @Input() options: Array<DropdownOption> = [];
  @Output() selectionChange = new EventEmitter<any>();

  selected!: any;

  ngOnInit(): void {
    this.setDefaultOption();
  }

  onSelectionChange(value: any): void {
    this.selectionChange.emit(value);
  }

  private setDefaultOption(): void {
    const options = this.options;

    if (options.length > 0) {
      const defaultOption = options.find((option) => option.default);

      if (defaultOption) {
        this.selected = defaultOption.value;
      } else {
        this.selected = options[0].value;
      }
    }
  }
}
