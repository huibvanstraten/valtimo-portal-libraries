import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipsComponent} from './tips.component';
import {TipsServiceModule} from '../../services';
import {CardModule} from '../card';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SpinnerModule} from '../spinner';

describe('TipsComponent', () => {
  let component: TipsComponent;
  let fixture: ComponentFixture<TipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TipsComponent],
      imports: [
        TipsServiceModule,
        CardModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        SpinnerModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
