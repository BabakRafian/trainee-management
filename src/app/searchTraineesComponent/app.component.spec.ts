import { TestBed, async } from '@angular/core/testing';
import { AppSearchTraineesComponent } from './app.searchTraineesComponent';
describe('AppSearchTraineesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppSearchTraineesComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppSearchTraineesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'roundtwo'`, async(() => {
    const fixture = TestBed.createComponent(AppSearchTraineesComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('roundtwo');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppSearchTraineesComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to roundtwo!');
  }));
});
