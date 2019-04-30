import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommanderGrantComponent } from './commander-grant.component';

describe('CommanderGrantComponent', () => {
  let component: CommanderGrantComponent;
  let fixture: ComponentFixture<CommanderGrantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommanderGrantComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommanderGrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
