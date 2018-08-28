/*
* CWM
* Task Service
* This service handles methods related to tasks and forwards them to the server
* code where it is then handled by the back end. Receives calls from View Batch
* Component and the Task Component
*/
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

  getBatchTasks(batchText: string) {
      return this.http.get<Task[]>('http://localhost:3000/tasklist/batch', {params: {batch_id: batchText}});
  }

  addTask(t_id: string, c_id: string, b_id: string, deadline: string, t_desc: string): Observable<Task[]> {
      return this.http.get<Task[]>('http://localhost:3000/tasklist/addtask', { params: {task_id: t_id, course_id: c_id, batch_id: b_id, deadline: deadline, task_description: t_desc}});
  }

  deleteTask(_id: string): Observable<Task[]> {
      return this.http.get<Task[]>('http://localhost:3000/tasklist/deletetask', { params: {task_id: _id}});
  }
}