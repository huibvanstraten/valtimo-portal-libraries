import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TipsComponent} from './tips.component';
import {TipsServiceModule} from '../../services';
import {CardModule} from '../card';
import {TranslateModule} from '@ngx-translate/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {SpinnerModule} from '../spinner';
import {environment} from '@src/environments';
import {LocalizeRouterService} from '@gilsdav/ngx-translate-router';
import {FakeLocalizeRouterService} from '@valtimo-portal/shared';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('TipsComponent', () => {
  let component: TipsComponent;
  let fixture: ComponentFixture<TipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: 'environment', useValue: environment},
        {provide: LocalizeRouterService, useClass: FakeLocalizeRouterService}
      ],
      declarations: [TipsComponent],
      imports: [
        TipsServiceModule,
        CardModule,
        TranslateModule.forRoot(),
        MatIconModule,
        MatButtonModule,
        SpinnerModule,
        ApolloTestingModule.withClients(environment.api.graphql.clients.map((client) => client.name)),
        RouterTestingModule
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
