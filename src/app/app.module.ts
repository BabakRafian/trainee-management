import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { TaskComponentComponent } from './task-component/task-component.component';

@NgModule({
  declarations: [
    AppSearchTraineesComponent,
    TaskComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [ AppSearchTraineesComponent ]
})
export class AppModule { }
