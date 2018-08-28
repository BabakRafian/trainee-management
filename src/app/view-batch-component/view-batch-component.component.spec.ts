import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBatchComponentComponent } from './view-batch-component.component';

describe('ViewBatchComponentComponent', () => {
  let component: ViewBatchComponentComponent;
  let fixture: ComponentFixture<ViewBatchComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBatchComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBatchComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
