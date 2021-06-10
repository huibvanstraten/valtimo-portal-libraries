import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormioForm, FormioRefreshValue} from '@formio/angular';
import {fadeInAnimations} from '../../animations';
import {FormStylingService, FormTranslationService} from '@valtimo-portal/form';
import {SidenavService} from '../../services';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {map} from 'rxjs/operators';

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

  formDefinition$ = new BehaviorSubject<FormioForm | undefined>(undefined);

  formIsWizard$: Observable<boolean> = this.formDefinition$.pipe(
    map((definition) => {
      if (definition) {
        return definition.display === 'wizard';
      }
      return false;
    })
  );

  refresh = new EventEmitter<FormioRefreshValue>();

  currentLangSubscription!: Subscription;

  constructor(
    private readonly formTranslationService: FormTranslationService,
    private readonly formStylingService: FormStylingService,
    private readonly sidenavService: SidenavService
  ) {
    this.currentLangSubscription = this.sidenavService.currentLang$.subscribe(() => {
      this.emitFormRefresh();
    });
  }

  ngOnInit(): void {
    this.formDefinition$.next(this.getProcessedDefinition());
  }

  ngOnDestroy(): void {
    this.currentLangSubscription.unsubscribe();
  }

  handleSubmit(submission: any): void {
    this.submission.emit(submission);
  }

  private getProcessedDefinition(): FormioForm {
    const translatedForm = this.formTranslationService.translateForm(this.definition, this.caseDefinitionId);
    return this.formStylingService.styleForm(translatedForm);
  }

  private emitFormRefresh(): void {
    setTimeout(() => {
      this.refresh.emit(
        {form: this.getProcessedDefinition()}
      );
    });
  }
}
