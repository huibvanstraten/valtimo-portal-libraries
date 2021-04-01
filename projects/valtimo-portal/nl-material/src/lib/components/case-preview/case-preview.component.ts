import {Component, Input, OnInit} from '@angular/core';
import {CasePreview} from '../../interfaces';
import {CardType} from '../../enums';

const mockCasePreview: CasePreview = {
  id: 'XXX',
  title: 'Aanvraag subsidie',
  tasks: [
    {
      title: 'Aanvraag ingediend',
      date: new Date(2021, 2, 20),
      completed: true
    },
    {
      title: 'Aanvraag bekeken',
      date: new Date(2020, 2, 21),
      completed: false
    },
    {
      title: 'Projectidee ingediend',
      date: new Date(2020, 4, 31),
      completed: false
    }
  ]
};

@Component({
  selector: 'nl-material-case-preview',
  templateUrl: './case-preview.component.html',
  styleUrls: ['./case-preview.component.scss']
})
export class CasePreviewComponent implements OnInit {
  @Input() preview: CasePreview = mockCasePreview;

  readonly casePreviewType = CardType.casePreview;

  constructor() {
  }

  ngOnInit(): void {
  }

}
