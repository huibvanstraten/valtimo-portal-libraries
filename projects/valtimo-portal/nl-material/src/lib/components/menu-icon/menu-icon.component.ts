import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SidenavService} from '../../services';
import {debounceTime, map, take} from 'rxjs/operators';

@Component({
  selector: 'nl-material-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
  @ViewChild('icon') iconRef!: ElementRef<HTMLDivElement>;

  open$!: Observable<boolean>;
  marginLeft$!: Observable<number>;

  constructor(private sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
    this.marginLeft$ = this.sidenavService.sidenavWidth$.pipe(
      debounceTime(10),
      map((width) => {
        const margin = width - 60;
        return margin > 0 ? margin : 0;
      }));
  }

  handleClick(): void {
    this.sidenavService.open$.pipe(take(1)).subscribe((open) => {
      this.sidenavService.open = !open;
    });
  }
}
