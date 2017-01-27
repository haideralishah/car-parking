/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BookparkingnewComponent } from './bookparkingnew.component';

describe('BookparkingnewComponent', () => {
  let component: BookparkingnewComponent;
  let fixture: ComponentFixture<BookparkingnewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookparkingnewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookparkingnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
