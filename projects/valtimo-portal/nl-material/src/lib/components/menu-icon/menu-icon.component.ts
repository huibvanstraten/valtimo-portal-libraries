import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'nl-material-menu-icon',
  templateUrl: './menu-icon.component.html',
  styleUrls: ['./menu-icon.component.scss']
})
export class MenuIconComponent {
  @ViewChild('icon') iconRef!: ElementRef<HTMLDivElement>;

  open$ = new BehaviorSubject<boolean>(false);

  handleClick(): void {
    this.open$.next(!this.open$.getValue());
  }
}
