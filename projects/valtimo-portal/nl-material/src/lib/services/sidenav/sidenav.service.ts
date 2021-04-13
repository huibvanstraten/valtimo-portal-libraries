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
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _open$ = new BehaviorSubject<boolean>(false);

  private _items$ = new BehaviorSubject<Array<NavigationMenuItem>>([]);

  private _currentLang$ = new BehaviorSubject<string>('');

  constructor(
    private readonly localizeRouterService: LocalizeRouterService,
    private readonly translateService: TranslateService
  ) {
    this.currentLang = this.translateService.currentLang;
  }

  get open$(): Observable<boolean> {
    return this._open$.asObservable();
  }

  set open(open: boolean) {
    this._open$.next(open);
  }

  get items$(): Observable<Array<NavigationMenuItem>> {
    return combineLatest([this._items$.asObservable(), this._currentLang$]).pipe(
      map(([items, currentLang]) => {
        const localizedItems = items.map((item) => ({
          ...item,
          link: `${currentLang}/${this.localizeRouterService.translateRoute(item.link)}`
        }));
        return localizedItems;
      })
    );
  }

  set items(items: Array<NavigationMenuItem>) {
    this._items$.next(items);
  }

  get currentLang$(): Observable<string> {
    return this._currentLang$.asObservable();
  }

  set currentLang(lang: string) {
    this._currentLang$.next(lang);
  }
}
