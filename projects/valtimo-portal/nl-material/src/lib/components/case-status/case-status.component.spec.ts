import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CaseStatusComponent} from './case-status.component';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('CaseStatusComponent', () => {
  let component: CaseStatusComponent;
  let fixture: ComponentFixture<CaseStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [CaseStatusComponent],
      imports: [MatIconModule, MatListModule, TranslateModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
