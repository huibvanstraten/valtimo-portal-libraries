import {AfterViewInit, Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormioForm, FormioOptions, FormioRefreshValue} from '@formio/angular';
import {fadeInAnimations} from '../../animations';

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fadeInAnimations
})
export class FormIoComponent implements AfterViewInit {
  @Input() definition!: FormioForm;
  @Input() caseDefinitionId!: string;
  @Input() title!: string;
  @Input() submitting = false;

  @Output() onSubmit = new EventEmitter<any>();

  refresh = new EventEmitter<FormioRefreshValue>();

  renderOptions = {
    language: 'nl'
  };

  formioOptions: FormioOptions = {
    i18n: {
      nl: {
        translation: {
          Submit: 'Indienen'
        }
      }
    }
  };

  handleSubmit(submission: any): void {
    this.onSubmit.emit(submission);
  }

  emitFormRefresh(): void {
    const newDef = {
      form: {
        ...this.definition,
        components: this.definition.components?.map((component) => ({...component, label: 'Hoi'}))
      }
    };
    console.log('def', this.definition);
    console.log('newdef', newDef);
    this.refresh.emit(newDef);
  }

  ngAfterViewInit(): void {
    this.emitFormRefresh();
  }
}
