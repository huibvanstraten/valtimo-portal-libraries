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
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  catchError(err: any, returnValue: any): Observable<any> {
    if (err.graphQLErrors) {
      err.graphQLErrors.forEach(e => {
        this.show(`${e?.message}`);
      });
    }
    if (err.networkError) {
      this.show(`${err?.networkError?.message}`);
    }
    return of(returnValue);
  }

  show(message: string): void {
    this.snackBar.open(message);
  }
}
