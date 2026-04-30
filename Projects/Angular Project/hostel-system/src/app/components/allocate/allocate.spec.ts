import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allocate } from './allocate';

describe('Allocate', () => {
  let component: Allocate;
  let fixture: ComponentFixture<Allocate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allocate],
    }).compileComponents();

    fixture = TestBed.createComponent(Allocate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
