import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ERationPage } from './e-ration.page';

describe('ERationPage', () => {
  let component: ERationPage;
  let fixture: ComponentFixture<ERationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ERationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ERationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
