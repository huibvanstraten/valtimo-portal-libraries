import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SidenavService} from '../../services';
import {BehaviorSubject, combineLatest, Observable, Subscription} from 'rxjs';
import {fadeInAnimations} from '../../animations';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';
import {PortalTask} from '@valtimo-portal/task';
import {CardType} from '../../enums';


@Component({
  selector: 'nl-material-task-preview',
  templateUrl: './task-preview.component.html',
  styleUrls: ['./task-preview.component.scss'],
  animations: fadeInAnimations
})
export class TaskPreviewComponent implements OnInit, OnDestroy {
  @Input() preview!: PortalTask;

  currentLang$!: Observable<string>;

  routeLangSubscription!: Subscription;

  readonly taskRoute$ = new BehaviorSubject<string>(this.getTaskRoute());

  readonly taskPreviewType = CardType.taskPreview;

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
          this.setTaskRoute();
        });
  }

  ngOnDestroy(): void {
    this.routeLangSubscription.unsubscribe();
  }

  getTaskRoute(): string {
    return `${this.localizeRouterService.translateRoute('/tasks/task')}`;
  }

  navigateToTask(): void {
    this.router.navigateByUrl(
      `${this.getTaskRoute()}?id=${this.preview.taskId}`,
    );
  }

  private setTaskRoute(): void {
    this.taskRoute$.next(
      this.getTaskRoute()
    );
  }
}
