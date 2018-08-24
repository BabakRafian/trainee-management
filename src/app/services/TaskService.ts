import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Task } from '../models/task';
import { Assigned_Task } from '../models/assignedTask'

@Injectable( {
    providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('http://localhost:3000/tasklist');
  }

  // getAssignedTasks(): Observable<Assigned_Task[]> {
  //     return this.http.get<Trainee[]>('http://localhost:3000/assignedtasklist');
  // }

  addTask(t_id: string, c_id: string, t_desc: string): Observable<Task[]> {
      return this.http.get<Task[]>('http://localhost:3000/tasklist/addtask', { params: {task_id: t_id, course_id: c_id, task_description: t_desc}});
  }

  // addAssignedTask(tsk: Task, b_id: string, dedlne: Date): Observable<Assigned_Task[]> {
  //     return this.http.get<Trainee[]>('http://localhost:3000/traineelist/addassignedtask', { params: {trainee_id: trainee_id, email: email, first: first, last: last, batch_id: batch_id}});
  // }

  deleteTask(_id: string): Observable<Task[]> {
      return this.http.get<Task[]>('http://localhost:3000/tasklist/deletetask', { params: {task_id: _id}});
  }

  // deleteAssignedTask(_id: string): Observable<Assigned_Task[]> {
  //     return this.http.get<Trainee[]>('http://localhost:3000/traineelist/deleteassignedtask', { params: {trainee_id: _id}});
  // }
}