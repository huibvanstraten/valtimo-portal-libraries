import {Component, Input, OnInit} from '@angular/core';
import {FormioForm} from "@formio/angular";

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss']
})
export class FormIoComponent implements OnInit {
  @Input() definition!: FormioForm;

  constructor() {
  }

  ngOnInit(): void {
  }

}
