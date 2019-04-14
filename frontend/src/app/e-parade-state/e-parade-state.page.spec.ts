import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EParadeStatePage } from './e-parade-state.page';

describe('EParadeStatePage', () => {
  let component: EParadeStatePage;
  let fixture: ComponentFixture<EParadeStatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EParadeStatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EParadeStatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
