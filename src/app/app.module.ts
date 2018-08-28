import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { AppTaskComponent } from './task-component/task-component.component';
import { ViewBatchComponent } from './view-batch-component/view-batch-component.component';

@NgModule({
  declarations: [
    AppSearchTraineesComponent,
    AppTaskComponent,
    ViewBatchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ ViewBatchComponent ]
})
export class AppModule { }
