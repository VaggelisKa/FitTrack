import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanceledTrainingsComponent } from './canceled-trainings.component';

describe('CanceledTrainingsComponent', () => {
  let component: CanceledTrainingsComponent;
  let fixture: ComponentFixture<CanceledTrainingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanceledTrainingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanceledTrainingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
