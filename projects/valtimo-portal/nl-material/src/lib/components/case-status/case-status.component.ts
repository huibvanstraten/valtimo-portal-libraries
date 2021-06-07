import {Component, Input, OnInit} from '@angular/core';
import {CardType, CasePreviewMode} from '../../enums';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';
import {CasePreviewStatus} from '@valtimo-portal/case';

@Component({
  selector: 'nl-material-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['../case-preview/case-preview.component.scss']
})
export class CaseStatusComponent implements OnInit {
  @Input() statuses: Array<CasePreviewStatus> = [];
  @Input() mode: CasePreviewMode = CasePreviewMode.clipping;
  @Input() caseDefinitionId = '';

  lastCompletedIndex = 0;

  readonly casePreviewClippingType = CardType.casePreviewClipping;
  readonly casePreviewCurrentType = CardType.casePreviewCurrent;
  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly currentPreviewMode = CasePreviewMode.current;

  currentLang$!: Observable<string>;

  constructor(private readonly sidenavService: SidenavService,
  ) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  ngOnInit(): void {
    this.lastCompletedIndex = this.getIndexOfLastCompletedStatus();
  }

  isClippingPreview(): boolean {
    return this.mode === this.clippingPreviewMode;
  }

  isCurrentCasePreview(): boolean {
    return this.mode === this.currentPreviewMode;
  }

  getLastCompletedStatus(): Array<CasePreviewStatus> {
    const completedStatuses = this.statuses.filter((status) => status.completed);
    return [{date: new Date(), id: '', completed: true}, completedStatuses[completedStatuses.length - 1]];
  }

  private getIndexOfLastCompletedStatus(): number {
    const completedStatuses = this.statuses.filter((status) => status.completed);
    return (completedStatuses.length - 1) || 0;
  }
}
