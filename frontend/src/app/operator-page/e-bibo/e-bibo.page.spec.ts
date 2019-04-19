import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbiboPage } from './ebibo.page';

describe('EbiboPage', () => {
  let component: EbiboPage;
  let fixture: ComponentFixture<EbiboPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbiboPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbiboPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
