import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {FormioForm} from '@formio/angular';
import {BehaviorSubject} from "rxjs";
import {CaseApiService} from "@valtimo-portal/case";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs/operators";
import {LocalizeRouterService} from "@gilsdav/ngx-translate-router";

@Component({
  selector: 'nl-material-form-io',
  templateUrl: './form-io.component.html',
  styleUrls: ['./form-io.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormIoComponent implements OnInit {
  @Input() definition!: FormioForm;

  submitting$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly caseApiService: CaseApiService,
    private route: ActivatedRoute,
    private localizeRouterService: LocalizeRouterService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit(submission: any): void {
    this.submitting$.next(true);

    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
          this.caseApiService.submitCase(submission.data, params.id).subscribe(() => {
            this.submitting$.next(false);
            this.router.navigateByUrl(
              `${this.localizeRouterService.translateRoute('/cases')}`
            );
          });
        }
      );
  }

}
