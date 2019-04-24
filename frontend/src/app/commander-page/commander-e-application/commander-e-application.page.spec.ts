import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanderEApplicationPage } from './commander-e-application.page';

describe('CommanderEApplicationPage', () => {
  let component: CommanderEApplicationPage;
  let fixture: ComponentFixture<CommanderEApplicationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommanderEApplicationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanderEApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
