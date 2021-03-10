import {Component, Input, OnInit} from '@angular/core';
import {CardType} from '../../interfaces';

@Component({
  selector: 'nl-material-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() type: CardType = CardType.default;
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() content!: string;
  @Input() buttonText!: string;
  @Input() icon!: string;

  readonly introductionType = CardType.introduction;
  readonly reminderType = CardType.reminder;

  constructor() {
  }

  ngOnInit(): void {
  }

}
