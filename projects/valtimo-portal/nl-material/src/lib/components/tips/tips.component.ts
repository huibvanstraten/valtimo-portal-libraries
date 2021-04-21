import {Component, OnInit} from '@angular/core';
import {TipsService} from '../../services';

@Component({
  selector: 'nl-material-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss']
})
export class TipsComponent implements OnInit {

  constructor(private readonly tipsService: TipsService) {
  }

  ngOnInit(): void {
  }

}
