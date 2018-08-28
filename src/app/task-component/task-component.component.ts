/*
* CWM
* Task Component
* Able to add tasks in general and attribute them to a single batch 
* or just create the task for the general tasks collection
* View all the tasks currently assigned to any batch
*/
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../services/TaskService';
import { Task } from '../models/task';
import { Assigned_Task } from '../models/assignedTask';

@Component({
  selector: 'task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
  providers: [ TaskService ]
})
export class AppTaskComponent implements OnInit {
  title = 'Add Tasks';
  tasks: Task[];
  assigned_tasks: Assigned_Task[];

  @ViewChild('taskId') taskId: ElementRef;
  @ViewChild('courseId') courseId: ElementRef;
  @ViewChild('batchId') batchId: ElementRef;
  @ViewChild('deadline') deadline: ElementRef;
  @ViewChild('taskDescription') taskDescription: ElementRef;

  constructor(private _taskService: TaskService) {}

  /*
  * ngOnInit executes when the page is loaded. 
  */
  ngOnInit() {
    this.getTasks();
  }

  /*
  * Go ahead and load a list of all current tasks that exist
  */
  getTasks(): void {
    this._taskService.getTasks()
      .subscribe(tsks => {
        this.tasks = tsks as Task[]
    });
  }

  /*
  * Used to start the search for a trainee. Sends the value of all of the input fields, sort out 
  * which ones are being used for the query on the back-end
  */
  addTask(taskId: string, courseId: string, batchId: string, deadline: string, desc: string): void {
    this._taskService.addTask(taskId, courseId, batchId, deadline, desc)
    .subscribe(tsks => {
        this.tasks = tsks as Task[]
        this.getTasks();//Should seperate out the functionality of adding a general task and adding a task to a batch
    });
    this.taskId.nativeElement.value='';
    this.courseId.nativeElement.value='';
    this.batchId.nativeElement.value='';
    this.deadline.nativeElement.value='';
    this.taskDescription.nativeElement.value='';
  }

  /*
  * Activated by the red X to the left of the trainee's name on the list. Sends the task_id
  * of the task to be deleted to the service class. task_id is a unique identifier so no 
  * need to send any other info about the task
  */
  deleteTask(_id: string): void {
    this._taskService.deleteTask(_id)
    .subscribe(tsks => {
      this.tasks = tsks as Task[]
    });
  }
}
