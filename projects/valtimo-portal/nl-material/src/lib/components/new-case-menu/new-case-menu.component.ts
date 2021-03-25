import {Component, OnInit} from '@angular/core';
import {FormApiService} from '@valtimo-portal/form';
import {fadeInAnimations} from '../../animations';

@Component({
  selector: 'nl-material-new-case-menu',
  templateUrl: './new-case-menu.component.html',
  styleUrls: ['./new-case-menu.component.scss'],
  animations: fadeInAnimations
})
export class NewCaseMenuComponent implements OnInit {

  availableFormDefinitions$ = this.formApiService.getAvailableFormDefinitions();

  constructor(private formApiService: FormApiService) {
  }

  ngOnInit(): void {
  }

}