import {Component, OnInit} from '@angular/core';
import {CardType} from "@valtimo-portal/nl-material";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  readonly introductionType = CardType.introduction;
  readonly reminderType = CardType.reminder;

  constructor() {
  }

  ngOnInit(): void {
  }

}
