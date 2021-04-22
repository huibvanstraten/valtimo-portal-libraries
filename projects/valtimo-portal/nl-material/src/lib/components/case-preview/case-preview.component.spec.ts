import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CasePreviewComponent} from './case-preview.component';
import {CardModule} from '../card';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {SidenavServiceModule} from '../../services';
import {MatButtonModule} from '@angular/material/button';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';

describe('CasePreviewComponent', () => {
  let component: CasePreviewComponent;
  let fixture: ComponentFixture<CasePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [CasePreviewComponent],
      imports: [
        NoopAnimationsModule,
        CardModule,
        TranslateModule.forRoot(),
        MatIconModule,
        SidenavServiceModule,
        MatButtonModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CasePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
