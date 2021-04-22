import {Component, Input} from '@angular/core';
import {CaseDetail} from '../../interfaces';

@Component({
  selector: 'nl-material-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent {
  @Input() caseDetails: Array<CaseDetail> = [];
  @Input() caseDefinitionId = '';
}
