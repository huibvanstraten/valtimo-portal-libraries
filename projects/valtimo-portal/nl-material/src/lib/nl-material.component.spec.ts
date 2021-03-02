import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NlMaterialComponent } from './nl-material.component';

describe('NlMaterialComponent', () => {
  let component: NlMaterialComponent;
  let fixture: ComponentFixture<NlMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NlMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NlMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
