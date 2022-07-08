/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PanComponent } from './pan.component';

describe('PanComponent', () => {
  let component: PanComponent;
  let fixture: ComponentFixture<PanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
