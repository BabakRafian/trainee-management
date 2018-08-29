import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeViewComponent } from './trainee-view.component';

describe('TraineeViewComponent', () => {
  let component: TraineeViewComponent;
  let fixture: ComponentFixture<TraineeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraineeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraineeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
