import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { AppTaskComponent } from './task-component/task-component.component';
import { ViewBatchComponent } from './view-batch-component/view-batch-component.component';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './/app-routing.module'; 
import { AppComponent } from './app.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { ViewTraineeComponent } from './view-trainee-component/view-trainee-component.component';

@NgModule({
  declarations: [
    AppSearchTraineesComponent,
    AppTaskComponent,
    ViewBatchComponent,
    LoginComponent,
    AppComponent,
    AdminHeaderComponent,
    ViewTraineeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
