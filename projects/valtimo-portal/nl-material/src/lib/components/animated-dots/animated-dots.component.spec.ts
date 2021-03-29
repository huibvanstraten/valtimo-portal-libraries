import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimatedDotsComponent } from './animated-dots.component';

describe('AnimatedDotsComponent', () => {
  let component: AnimatedDotsComponent;
  let fixture: ComponentFixture<AnimatedDotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimatedDotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimatedDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
