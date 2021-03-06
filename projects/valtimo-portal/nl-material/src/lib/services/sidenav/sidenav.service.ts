import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {NavigationMenuItem} from '../../interfaces';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private _open$ = new BehaviorSubject<boolean>(false);

  private _items$ = new BehaviorSubject<Array<NavigationMenuItem>>([]);

  private _sidenavWidth$ = new BehaviorSubject<number>(0);

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

  get sidenavWidth$(): Observable<number> {
    return this._sidenavWidth$.asObservable();
  }

  set sidenavWidth(width: number) {
    this._sidenavWidth$.next(width);
  }
}
