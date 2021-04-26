import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CardModule} from '../card';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {SidenavServiceModule} from '../../services';
import {MatButtonModule} from '@angular/material/button';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';
import {CaseStatusModule} from '../case-status';
import {RouterTestingModule} from '@angular/router/testing';
import {TaskPreviewComponent} from './task-preview.component';

describe('TaskPreviewComponent', () => {
  let component: TaskPreviewComponent;
  let fixture: ComponentFixture<TaskPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [TaskPreviewComponent],
      imports: [
        NoopAnimationsModule,
        CardModule,
        TranslateModule.forRoot(),
        MatIconModule,
        SidenavServiceModule,
        MatButtonModule,
        CaseStatusModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
