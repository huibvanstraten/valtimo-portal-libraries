import {Component, Input} from '@angular/core';
import {CasePreview, TaskPreview} from '../../interfaces';
import {CardType} from '../../enums';
import {SidenavService} from "../../services";
import {Observable} from "rxjs";

const mockCasePreview: CasePreview = {
  id: 'grant-application',
  tasks: [
    {
      id: 'submitted',
      date: new Date(2021, 2, 20),
      completed: true
    },
    {
      id: 'processed',
      date: new Date(2020, 2, 21),
      completed: false
    },
    {
      id: 'plan',
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
export class CasePreviewComponent {
  @Input() preview: CasePreview = mockCasePreview;

  currentLang$!: Observable<string>;


  readonly casePreviewType = CardType.casePreview;


  constructor(private sidenavService: SidenavService) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  getOpenTasks(tasks: Array<TaskPreview>): Array<TaskPreview> {
    return tasks.filter((task) => !task.completed);
  }
}
