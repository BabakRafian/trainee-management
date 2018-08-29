import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { AppTaskComponent } from './task-component/task-component.component';
import { TraineeViewComponent } from './trainee-view/trainee-view.component';
import { ToDoTasksComponent } from './to-do-tasks/to-do-tasks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppSearchTraineesComponent,
    AppTaskComponent,
    TraineeViewComponent,
    ToDoTasksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [ AppSearchTraineesComponent ]
})
export class AppModule { }
