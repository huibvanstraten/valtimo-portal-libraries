import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {BreakpointObserver} from '@angular/cdk/layout';
import {SidenavService} from '../../services';
import {take} from 'rxjs/operators';

@Component({
  selector: 'nl-material-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
  @ViewChild('icon') iconRef!: ElementRef<HTMLDivElement>;

  open$!: Observable<boolean>;

  constructor(private sidenavService: SidenavService) {
    this.open$ = this.sidenavService.open$;
  }

  handleClick(): void {
    this.sidenavService.open$.pipe(take(1)).subscribe((open) => {
      this.sidenavService.open = !open;
    });
  }
}
