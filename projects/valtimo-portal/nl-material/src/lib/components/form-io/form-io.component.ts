import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormioForm, FormioOptions, FormioRefreshValue, FormioSubmission} from '@formio/angular';
import {fadeInAnimations} from '../../animations';
import {FormMappingService, FormStylingService, FormTranslationService} from '@valtimo-portal/form';
import {SidenavService} from '../../services';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fadeInAnimations
})
export class FormIoComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() definition!: FormioForm;
  @Input() caseDefinitionId!: string;
  @Input() submissionData?: object | {} = {};
  @Input() title!: string;
  @Input() submitting = false;
  @Input() reset$!: Subject<boolean>;

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

  private currentLangSubscription!: Subscription;

  private resetSubscription!: Subscription;

  readonly options: FormioOptions = {
    disableAlerts: true
  };

  constructor(
    private readonly formTranslationService: FormTranslationService,
    private readonly formStylingService: FormStylingService,
    private readonly formMappingService: FormMappingService,
    private readonly sidenavService: SidenavService,
    private readonly translateService: TranslateService,
    @Inject(DOCUMENT) private readonly document: HTMLDocument
  ) {
    this.currentLangSubscription = this.sidenavService.currentLang$.subscribe(() => {
      this.emitFormRefresh();
    });
  }

  ngOnInit(): void {
    this.formDefinition$.next(this.getProcessedDefinition());
    this.setResetSubscription();
  }

  ngAfterViewInit(): void {
    this.setWizardButtons();
  }

  ngOnDestroy(): void {
    this.currentLangSubscription.unsubscribe();
    this.resetSubscription?.unsubscribe();
  }

  handleSubmit(submission: FormioSubmission): void {
    const mappedSubmission = this.formMappingService.mapSubmission(submission);
    this.submission.emit(mappedSubmission);
  }

  setWizardButtons(): void {
    this.formIsWizard$.pipe(take(1)).subscribe((isWizard) => {
      if (isWizard) {
        const nextButtons = Array.from(this.document.querySelectorAll('.btn-wizard-nav-next'));
        const previousButtons = Array.from(this.document.querySelectorAll('.btn-wizard-nav-previous'));
        const submitButtons = Array.from(this.document.querySelectorAll('.btn-wizard-nav-submit'));
        const wizardButtons = [...nextButtons, ...previousButtons, ...submitButtons];

        wizardButtons.forEach((button) => {
          button.setAttribute('class', 'mat-flat-button mat-primary');
          (button as any).style.opacity = '1';
          button.textContent = this.translateService.instant(`formTranslations.${button.textContent}`);
        });
      }
    });
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

  private setResetSubscription(): void {
    if (this.reset$) {
      this.resetSubscription = this.reset$.subscribe(() => {
        this.emitFormRefresh();
      });
    }
  }
}
