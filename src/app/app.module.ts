import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { AppTaskComponent } from './task-component/task-component.component';
import { TraineeViewComponent } from './trainee-view/trainee-view.component';
import { ToDoTasksComponent } from './to-do-tasks/to-do-tasks.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ViewBatchComponent } from './view-batch-component/view-batch-component.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module'; 
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [
    AppSearchTraineesComponent,
    AppTaskComponent,
    TraineeViewComponent,
    ToDoTasksComponent,
    ViewBatchComponent,
    LoginComponent,
    AppComponent,
    AdminHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
