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

import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CardType} from '../../enums';

@Component({
  selector: 'nl-material-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() type: CardType = CardType.default;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() buttonText!: string;
  @Input() secondaryButtonText!: string;
  @Input() icon!: string;

  @Output() primaryButtonClick = new EventEmitter<any>();
  @Output() secondaryButtonClick = new EventEmitter<any>();

  readonly introductionType = CardType.introduction;
  readonly reminderType = CardType.reminder;
  readonly casePreviewClippingType = CardType.casePreviewClipping;
  readonly casePreviewCurrentType = CardType.casePreviewCurrent;
  readonly caseStatusType = CardType.caseStatus;
  readonly tipType = CardType.tip;

  handlePrimaryButtonClick(): void {
    this.primaryButtonClick.emit();
  }

  handleSecondaryButtonClick(): void {
    this.secondaryButtonClick.emit();
  }
}
