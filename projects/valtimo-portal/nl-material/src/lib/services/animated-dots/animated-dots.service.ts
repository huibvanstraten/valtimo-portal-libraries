/*
 * Copyright 2015-2021 Ritense BV, the Netherlands.
 *
 * Licensed under EUPL, Version 1.2 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, interval, Observable, Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimatedDotsService implements OnDestroy {

  private readonly dotsArray = [
    `${this.getBlankSpaces(3)}`,
    `.${this.getBlankSpaces(2)}`,
    `..${this.getBlankSpaces(1)}`,
    '...'];

  private readonly _dots$ = new BehaviorSubject<string>(this.dotsArray[0]);

  private intervalSubscription!: Subscription;

  private readonly intervalDurationMs = 350;

  constructor() {
    this.intervalSubscription = interval(this.intervalDurationMs)
      .subscribe(() => {
        this._dots$.pipe(take(1)).subscribe((currentDots) => {
          const dotsArray = this.dotsArray;
          const dotsCurrentIndex = dotsArray.findIndex((dots) => dots === currentDots);
          if (dotsCurrentIndex === dotsArray.length - 1) {
            this.setDots(dotsArray[0]);
          } else {
            this.setDots(dotsArray[dotsCurrentIndex + 1]);
          }
        });
      });
  }

  get dots$(): Observable<string> {
    return this._dots$.asObservable();
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

  private setDots(dots: string): void {
    this._dots$.next(dots);
  }

  private getBlankSpaces(amount: number): string {
    const blankSpace = '\xa0';
    let spaceString = '';
    [...Array(amount)].forEach(() => spaceString = `${spaceString}${blankSpace}`);
    return spaceString;
  }
}
