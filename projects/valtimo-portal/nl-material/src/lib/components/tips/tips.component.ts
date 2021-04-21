import {Component} from '@angular/core';
import {TipsService} from '../../services';
import {Tip} from '../../interfaces';
import {BehaviorSubject, Observable} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {CardType} from '../../enums';

@Component({
  selector: 'nl-material-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent {

  index$ = new BehaviorSubject<number>(0);

  tips$!: Observable<Array<Tip>>;

  readonly tipType = CardType.tip;

  constructor(private readonly tipsService: TipsService) {
    this.tips$ = this.tipsService.tips$
      .pipe(
        tap(() => this.index$.next(0))
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
}
