import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _open$ = new BehaviorSubject<boolean>(false);

  private _items$ = new BehaviorSubject<Array<NavigationMenuItem>>([]);

  constructor() {
  }

  get open$(): Observable<boolean> {
    return this._open$.asObservable();
  }

  set open(open: boolean) {
    this._open$.next(open);
  }

  get items$(): Observable<Array<NavigationMenuItem>> {
    return this._items$.asObservable();
  }

  set items(items: Array<NavigationMenuItem>) {
    this._items$.next(items);
  }
}
