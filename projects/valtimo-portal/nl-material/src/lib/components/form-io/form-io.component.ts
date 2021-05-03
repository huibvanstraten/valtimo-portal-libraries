import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormioForm, FormioRefreshValue} from '@formio/angular';
import {fadeInAnimations} from '../../animations';
import {FormTranslationService} from '@valtimo-portal/form';
import {SidenavService} from '../../services';
import {Subscription} from 'rxjs';

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fadeInAnimations
})
export class FormIoComponent implements OnInit, OnDestroy {
  @Input() definition!: FormioForm;
  @Input() caseDefinitionId!: string;
  @Input() title!: string;
  @Input() submitting = false;

  @Output() submission = new EventEmitter<any>();

  translatedDefinition!: FormioForm;

  refresh = new EventEmitter<FormioRefreshValue>();

  currentLangSubscription!: Subscription;

  constructor(
    private readonly formTranslationService: FormTranslationService,
    private readonly sidenavService: SidenavService
  ) {
    this.currentLangSubscription = this.sidenavService.currentLang$.subscribe(() => {
      this.emitFormRefresh();
    });
  }

  ngOnInit(): void {
    this.translatedDefinition = this.getTranslatedDefinition();
  }

  ngOnDestroy(): void {
    this.currentLangSubscription.unsubscribe();
  }

  handleSubmit(submission: any): void {
    this.submission.emit(submission);
  }

  private getTranslatedDefinition(): FormioForm {
    return this.formTranslationService.translateForm(this.definition, this.caseDefinitionId);
  }

  private emitFormRefresh(): void {
    setTimeout(() => {
      this.refresh.emit(
        {form: this.getTranslatedDefinition()}
      );
    });
  }
}
