import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EApplicationPage } from './e-application.page';

describe('EApplicationPage', () => {
  let component: EApplicationPage;
  let fixture: ComponentFixture<EApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EApplicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
