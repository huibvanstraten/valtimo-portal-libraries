import {Component, Input, OnInit} from '@angular/core';
import {CasePreview, TaskPreview} from '../../interfaces';
import {CardType, CasePreviewMode} from '../../enums';
import {SidenavService} from '../../services';
import {BehaviorSubject, Observable} from 'rxjs';
import {fadeInAnimations} from '../../animations';

const mockCasePreview: CasePreview = {
  id: 'grant-application',
  code: 'xxx',
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
  styleUrls: ['./case-preview.component.scss'],
  animations: fadeInAnimations
})
export class CasePreviewComponent implements OnInit {
  @Input() preview: CasePreview = mockCasePreview;
  @Input() mode: CasePreviewMode = CasePreviewMode.clipping;

  currentLang$!: Observable<string>;

  readonly casePreviewClippingType = CardType.casePreviewClipping;
  readonly casePreviewCurrentType = CardType.casePreviewCurrent;
  readonly clippingPreviewMode = CasePreviewMode.clipping;
  readonly currentPreviewMode = CasePreviewMode.current;

  readonly previewTasks$ = new BehaviorSubject<Array<TaskPreview>>([]);

  constructor(private readonly sidenavService: SidenavService) {
    this.currentLang$ = this.sidenavService.currentLang$;
  }

  ngOnInit(): void {
    this.setTasksForPreview();
  }

  getOpenTasks(tasks: Array<TaskPreview>): Array<TaskPreview> {
    return tasks.filter((task) => !task.completed);
  }

  setTasksForPreview(): void {
    const preview = this.preview;

    if (preview.tasks.length > 0) {
      if (this.isClippingPreview()) {
        this.setPreviewTasks(preview.tasks);
      } else {
        this.setPreviewTasks(this.getCurrentCaseTasks(preview.tasks));
      }
    } else if (preview.status) {
      this.setStatusPreview();
    }
  }

  getCurrentCaseTasks(tasks: Array<TaskPreview>): Array<TaskPreview> {
    if (tasks.length === 1) {
      return tasks;
    } else {
      const completedTasks = tasks.filter((task) => task.completed);
      const lastCompletedTaskIndex = completedTasks.length - 1;
      const lastCompletedTask = completedTasks[lastCompletedTaskIndex];
      const nextTask = tasks[lastCompletedTaskIndex + 1];
      return [lastCompletedTask, nextTask].filter((value) => value);
    }
  }

  isClippingPreview(): boolean {
    return this.mode === this.clippingPreviewMode;
  }

  isCurrentCasePreview(): boolean {
    return this.mode === this.currentPreviewMode;
  }

  private setPreviewTasks(tasks: Array<TaskPreview>): void {
    this.previewTasks$.next(tasks);
  }

  private setStatusPreview(): void {
    const date = new Date();

    this.setPreviewTasks(
      [
        {
          date,
          id: '',
          completed: true
        },
        {
          date,
          id: this.preview.status || '',
          completed: false
        }
      ]
    );
  }
}
