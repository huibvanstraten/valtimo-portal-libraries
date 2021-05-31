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

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BreadcrumbReplacement} from '../../interfaces';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  private _breadcrumbReplacements$ = new BehaviorSubject<Array<BreadcrumbReplacement>>([]);

  get breadcrumbReplacements$(): Observable<Array<BreadcrumbReplacement>> {
    return this._breadcrumbReplacements$.asObservable();
  }

  getBreadcrumbReplacement(position: number): Observable<string> {
    return this._breadcrumbReplacements$.pipe(
      map((replacements) =>
        replacements.find((replacement) => replacement.positionInUrl === position)?.replacementTitle || '')
    );
  }

  clearBreadcrumbReplacements(): void {
    this._breadcrumbReplacements$.next([]);
  }

  clearBreadcrumbReplacement(position: number): void {
    this._breadcrumbReplacements$.pipe(take(1))
      .subscribe((breadcrumbReplacements) => {
        this._breadcrumbReplacements$.next(
          breadcrumbReplacements.filter((replacement) => replacement.positionInUrl !== position)
        );
      });
  }

  setBreadcrumbReplacement(replacement: BreadcrumbReplacement): void {
    this.clearBreadcrumbReplacement(replacement.positionInUrl);
    this.addBreadcrumbReplacement(replacement);
  }

  private addBreadcrumbReplacement(replacement: BreadcrumbReplacement): void {
    this._breadcrumbReplacements$.pipe(take(1))
      .subscribe((breadcrumbReplacements) => {
        this._breadcrumbReplacements$.next(
          [...breadcrumbReplacements, replacement]
        );
      });
  }
}
