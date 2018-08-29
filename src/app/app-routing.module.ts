import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppSearchTraineesComponent } from './searchTraineesComponent/app.searchTraineesComponent';
import { AppTaskComponent } from './task-component/task-component.component';
import { ViewBatchComponent } from './view-batch-component/view-batch-component.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'searchTrainee', component: AppSearchTraineesComponent },
  { path: 'taskPage', component: AppTaskComponent },
  { path: 'viewBatch', component: ViewBatchComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
