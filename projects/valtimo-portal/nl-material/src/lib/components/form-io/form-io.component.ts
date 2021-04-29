import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormioForm} from '@formio/angular';
import {fadeInAnimations} from '../../animations';

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fadeInAnimations
})
export class FormIoComponent {
  @Input() definition!: FormioForm;
  @Input() title!: string;
  @Input() submitting = false;

  @Output() onSubmit = new EventEmitter<any>();

  handleSubmit(submission: any): void {
    this.onSubmit.emit(submission);
  }
}
