import {Component, Input, OnInit} from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'nl-material-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() mode: ProgressSpinnerMode = 'indeterminate';
  @Input() diameter = 48;
  @Input() strokeWidth = 6;

  constructor() {
  }

  ngOnInit(): void {
  }

}
