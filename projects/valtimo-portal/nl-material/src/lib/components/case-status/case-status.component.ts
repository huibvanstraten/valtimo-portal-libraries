import {Component, Input} from '@angular/core';
import {CardType, CasePreviewMode} from '../../enums';
import {SidenavService} from '../../services';
import {Observable} from 'rxjs';
import {CasePreviewStatus} from '@valtimo-portal/case';

@Component({
  selector: 'nl-material-case-status',
  templateUrl: './case-status.component.html',
  styleUrls: ['../case-preview/case-preview.component.scss']
})
export class CaseStatusComponent {
  @Input() statuses: Array<CasePreviewStatus> = [];
  @Input() mode: CasePreviewMode = CasePreviewMode.clipping;
  @Input() caseDefinitionId = '';

  readonly casePreviewClippingType = CardType.casePreviewClipping;
  readonly casePreviewCurrentType = CardType.casePreviewCurrent;
  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly currentPreviewMode = CasePreviewMode.current;

  currentLang$!: Observable<string>;

  constructor(private readonly sidenavService: SidenavService,
  ) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  isClippingPreview(): boolean {
    return this.mode === this.clippingPreviewMode;
  }

  isCurrentCasePreview(): boolean {
    return this.mode === this.currentPreviewMode;
  }

  getUncompletedStatuses(): Array<CasePreviewStatus> {
    return this.statuses.filter((status) => !status.completed);
  }

}
