import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _open$ = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get open$(): Observable<boolean> {
    return this._open$.asObservable();
  }

  set open(open: boolean) {
    this._open$.next(open);
  }
}
