import {Component, OnDestroy, OnInit} from '@angular/core';
import {TipsService} from '../../services';
import {Tip} from '../../interfaces';
import {BehaviorSubject, combineLatest, interval, Subscription} from 'rxjs';
import {map, switchMap, take, tap} from 'rxjs/operators';
import {CardType} from '../../enums';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {Router} from '@angular/router';
import {fadeInAnimations} from '../../animations';

@Component({
  selector: 'nl-material-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
  animations: fadeInAnimations
})
export class TipsComponent implements OnInit, OnDestroy {

  index$ = new BehaviorSubject<number>(0);

  tipsLength$ = new BehaviorSubject<number>(0);

  // @ts-ignore
  tip$ = new BehaviorSubject<Tip>(undefined);

  private tipsSubscription!: Subscription;
  private intervalSubscription!: Subscription;

  readonly tipType = CardType.tip;

  private readonly tipIntervalInSeconds: number = 15;

  constructor(
    private readonly tipsService: TipsService,
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {
    this.openTipsSubscription();
    this.openIntervalSubscription();
  }

  ngOnDestroy(): void {
    this.tipsSubscription.unsubscribe();
    this.closeIntervalSubscription();
  }

  next(): void {
    this.closeIntervalSubscription();

    this.index$.pipe(take(1)).subscribe((index) => {
      this.index$.next(index + 1);
    });
  }

  previous(): void {
    this.closeIntervalSubscription();

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

  private openTipsSubscription(): void {
    this.tipsSubscription =
      combineLatest([this.tipsService.tips$, this.index$])
        .pipe(
          tap(([tips]) => this.tipsLength$.next(tips.length)),
          map(([tips, index]) => this.tip$.next(tips[index]))
        )
        .subscribe();
  }

  private openIntervalSubscription(): void {
    this.intervalSubscription = interval(this.tipIntervalInSeconds * 1000)
      .pipe(
        switchMap(() => combineLatest([this.index$, this.tipsLength$]).pipe(take(1))),
        tap(([index, length]) => {
          if (index + 1 === length) {
            this.index$.next(0);
          } else {
            this.index$.next(index + 1);
          }
        })
      ).subscribe();
  }

  private closeIntervalSubscription(): void {
    this.intervalSubscription.unsubscribe();
  }
}
