import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../services/TaskService';
import { Task } from '../models/task';
import { Assigned_Task } from '../models/assignedTask';

@Component({
  selector: 'app-root',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
  providers: [ TaskService ]
})
export class AppTaskComponent implements OnInit {
  title = 'Add Tasks';
  tasks: Task[];
  assigned_tasks: Assigned_Task[];
  myDate: Date;

  @ViewChild('taskId') taskId: ElementRef;
  @ViewChild('courseId') courseId: ElementRef;
  @ViewChild('batchId') batchId: ElementRef;
  @ViewChild('deadline') deadline: ElementRef;
  @ViewChild('taskDescription') taskDescription: ElementRef;

  constructor(private _taskService: TaskService) {}

  // angular.module('datepickerBasicUsage', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
  //   this.myDate = new Date();
  //   this.isOpen = false;
  // });

  /*
  * ngOnInit executes when the page is loaded. 
  */
  ngOnInit() {
    this.getTasks();
    // this.getAssignedTasks();
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
  // getAssignedTasks(): void {
  //   this._taskService.getAssignedTasks()
  //     .subscribe(assigned => {
  //       this.assigned_tasks = Assigned as Assigned_Task[]
  //   });
  // }

  /*
  * Used to start the search for a trainee. Sends the value of all of the input fields, sort out 
  * which ones are being used for the query on the back-end
  */
  addTask(taskId: string, courseId: string, batchId: string, deadline: Date, desc: string): void {
    //var newTask = new Task(taskId, courseId, desc);
    this._taskService.addTask(taskId, courseId, desc)
    .subscribe(tsks => {
        this.tasks = tsks as Task[]
    });
    // var newAssigned = new Assigned_Task(newTask, batchId, deadline)
    // this._taskService.addAssignedTask(newAssigned)
    // .subscribe(tsks => {
    //     this.assigned_tasks = tsks as Assigned_Task[]
    // });
    this.taskId.nativeElement.value='';
    this.courseId.nativeElement.value='';
    this.batchId.nativeElement.value='';
    this.deadline.nativeElement.value='';
    this.taskDescription.nativeElement.value='';
  }

  /*
  * Activated by the red X to the left of the trainee's name on the list. Sends the trainee_id
  * of the trainee to be deleted to the service class. trainee_id is a unique identifier so no 
  * need to send any other info about the trainee
  */
  deleteTask(_id: string): void {
    this._taskService.deleteTask(_id)
    .subscribe(tsks => {
      this.tasks = tsks as Task[]
    });
    // this._taskService.deleteAssignedTask(_id)
    // .subscribe(tsks => {
    //   this.assigned_tasks = tsks as Assigned_Task[]
    // });
  }
}
