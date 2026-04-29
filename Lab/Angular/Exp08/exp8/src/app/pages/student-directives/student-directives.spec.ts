import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDirectives } from './student-directives';

describe('StudentDirectives', () => {
  let component: StudentDirectives;
  let fixture: ComponentFixture<StudentDirectives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentDirectives],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentDirectives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
