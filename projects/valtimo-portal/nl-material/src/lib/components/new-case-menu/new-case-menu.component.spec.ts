import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewCaseMenuComponent} from './new-case-menu.component';
import {CaseServiceModule} from '@valtimo-portal/case';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SidenavServiceModule} from '../../services';
import {SpinnerModule} from '../spinner';
import {RouterTestingModule} from '@angular/router/testing';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';
import {ApolloTestingModule} from 'apollo-angular/testing';

describe('NewCaseMenuComponent', () => {
  let component: NewCaseMenuComponent;
  let fixture: ComponentFixture<NewCaseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [NewCaseMenuComponent],
      imports: [
        CaseServiceModule,
        MatMenuModule,
        MatListModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        RouterTestingModule,
        SidenavServiceModule,
        SpinnerModule,
        ApolloTestingModule.withClients(environment.api.graphql.clients.map((client) => client.name))]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
