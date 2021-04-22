import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormIoComponent} from './form-io.component';
import {MatFormioModule} from '@formio/angular-material';
import {MatIconModule} from '@angular/material/icon';
import {CaseServiceModule} from '@valtimo-portal/case';
import {RouterTestingModule} from '@angular/router/testing';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';
import {environment} from '@src/environments';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateModule} from '@ngx-translate/core';

describe('FormIoComponent', () => {
  let component: FormIoComponent;
  let fixture: ComponentFixture<FormIoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [FormIoComponent],
      imports: [
        NoopAnimationsModule,
        MatFormioModule,
        MatIconModule,
        CaseServiceModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
