import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CaseDetailsComponent} from './case-details.component';
import {TranslateModule} from '@ngx-translate/core';
import {MatListModule} from '@angular/material/list';

describe('CaseDetailsComponent', () => {
  let component: CaseDetailsComponent;
  let fixture: ComponentFixture<CaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaseDetailsComponent],
      imports: [
        TranslateModule.forRoot(),
        MatListModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
