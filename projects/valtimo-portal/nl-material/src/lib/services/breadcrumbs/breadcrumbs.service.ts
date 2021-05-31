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
import {BreadcrumbTitleReplacement} from '../../interfaces';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  private _breadcrumbTitleReplacements$ = new BehaviorSubject<Array<BreadcrumbTitleReplacement>>([]);

  get breadcrumbTitleReplacements$(): Observable<Array<BreadcrumbTitleReplacement>> {
    return this._breadcrumbTitleReplacements$.asObservable();
  }

  getBreadcrumbTitleReplacement(position: number): Observable<string> {
    return this._breadcrumbTitleReplacements$.pipe(
      map((replacements) =>
        replacements.find((replacement) => replacement.positionInUrl === position)?.replacementTitle || '')
    );
  }

  clearBreadcrumbTitleReplacements(): void {
    this._breadcrumbTitleReplacements$.next([]);
  }

  clearBreadcrumbTitleReplacement(position: number): void {
    this._breadcrumbTitleReplacements$.pipe(take(1))
      .subscribe((breadcrumbTitleReplacements) => {
        this._breadcrumbTitleReplacements$.next(
          breadcrumbTitleReplacements.filter((replacement) => replacement.positionInUrl !== position)
        );
      });
  }

  setBreadcrumbTitleReplacement(replacement: BreadcrumbTitleReplacement): void {
    this.clearBreadcrumbTitleReplacement(replacement.positionInUrl);
    this.addBreadcrumbTitleReplacement(replacement);
  }

  private addBreadcrumbTitleReplacement(replacement: BreadcrumbTitleReplacement): void {
    this._breadcrumbTitleReplacements$.pipe(take(1))
      .subscribe((breadcrumbTitleReplacements) => {
        this._breadcrumbTitleReplacements$.next(
          [...breadcrumbTitleReplacements, replacement]
        );
      });
  }
}
