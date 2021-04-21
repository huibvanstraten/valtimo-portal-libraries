import {Component} from '@angular/core';
import {TipsService} from '../../services';
import {Tip} from '../../interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {CardType} from '../../enums';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';

@Component({
  selector: 'nl-material-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {

  index$ = new BehaviorSubject<number>(0);

  tips$!: Observable<Array<Tip>>;

  readonly tipType = CardType.tip;

  constructor(
    private readonly tipsService: TipsService,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
    this.tips$ = this.tipsService.tips$
      .pipe(
        tap(() => {
          this.index$.next(0);
        })
      );
  }

  next(): void {
    this.index$.pipe(take(1)).subscribe((index) => {
      this.index$.next(index + 1);
    });
  }

  previous(): void {
    this.index$.pipe(take(1)).subscribe((index) => {
      this.index$.next(index - 1);
    });
  }

  goToNewCase(caseDefinitionId: string): void {
    this.router.navigateByUrl(
      `${this.getNewCaseRoute()}?id=${caseDefinitionId}`
    );
  }

  private getNewCaseRoute(): string {
    return `${this.localizeRouterService.translateRoute('/cases/newCase')}`;
  }
}
