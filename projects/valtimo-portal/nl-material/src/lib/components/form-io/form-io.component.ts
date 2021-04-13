import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormioForm} from '@formio/angular';
import {BehaviorSubject} from 'rxjs';
import {CaseService} from '@valtimo-portal/case';
import {ActivatedRoute, Router} from '@angular/router';
import {take} from 'rxjs/operators';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
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

  submitting$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly caseService: CaseService,
    private readonly route: ActivatedRoute,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
  }

  onSubmit(submission: any): void {
    this.submitting$.next(true);

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
          this.caseService.submitCase(submission.data, params.id).subscribe(() => {
            this.submitting$.next(false);
            this.router.navigateByUrl(
              `${this.localizeRouterService.translateRoute('/cases')}`
            );
          });
        }
      );
  }

}
