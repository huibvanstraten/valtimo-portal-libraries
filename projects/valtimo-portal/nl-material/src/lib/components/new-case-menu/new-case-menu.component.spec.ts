import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseMenuComponent } from './new-case-menu.component';

describe('NewCaseMenuComponent', () => {
  let component: NewCaseMenuComponent;
  let fixture: ComponentFixture<NewCaseMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseMenuComponent ]
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
