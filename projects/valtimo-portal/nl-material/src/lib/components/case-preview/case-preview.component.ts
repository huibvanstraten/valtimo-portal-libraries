import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CasePreview} from '@valtimo-portal/case';
import {CardType, CasePreviewMode} from '../../enums';
import {SidenavService} from '../../services';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {fadeInAnimations} from '../../animations';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';

@Component({
  selector: 'nl-material-case-preview',
  templateUrl: './case-preview.component.html',
  styleUrls: ['./case-preview.component.scss'],
  animations: fadeInAnimations
})
export class CasePreviewComponent implements OnInit, OnDestroy {
  @Input() preview!: CasePreview;
  @Input() mode: CasePreviewMode = CasePreviewMode.clipping;

  currentLang$!: Observable<string>;

  routeLangSubscription!: Subscription;

  readonly casePreviewClippingType = CardType.casePreviewClipping;
  readonly casePreviewCurrentType = CardType.casePreviewCurrent;
  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly currentPreviewMode = CasePreviewMode.current;

  readonly caseRoute$ = new BehaviorSubject<string>(this.getCaseRoute());

  constructor(
    private readonly sidenavService: SidenavService,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  ngOnInit(): void {
    this.routeLangSubscription =
      combineLatest([this.sidenavService.currentLang$, this.router.events])
        .subscribe(() => {
          this.setCaseRoute();
        });
  }

  ngOnDestroy(): void {
    this.routeLangSubscription.unsubscribe();
  }

  isClippingPreview(): boolean {
    return this.mode === this.clippingPreviewMode;
  }

  isCurrentCasePreview(): boolean {
    return this.mode === this.currentPreviewMode;
  }

  getCaseRoute(): string {
    return `${this.localizeRouterService.translateRoute('/cases/case')}`;
  }

  navigateToCase(): void {
    this.router.navigateByUrl(
      `${this.getCaseRoute()}?id=${this.preview.id}`,
    );
  }

  getLatestPreviewDate(preview: CasePreview): Date {
    const completedStatuses = preview.statuses.filter((status) => status.date && status.completed);
    return completedStatuses[completedStatuses.length - 1].date as Date;
  }

  private setCaseRoute(): void {
    this.caseRoute$.next(
      this.getCaseRoute()
    );
  }
}
