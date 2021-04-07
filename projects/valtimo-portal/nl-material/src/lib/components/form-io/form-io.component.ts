import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormioForm} from '@formio/angular';

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormIoComponent implements OnInit {
  @Input() definition!: FormioForm;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(data: any) {
    console.log(data)
  }

}
