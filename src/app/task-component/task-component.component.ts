import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../services/TaskService';
import { Task } from '../models/task';
import { Assigned_Task } from '../models/assignedTask';

@Component({
  selector: 'app-task-component',
  templateUrl: './task-component.component.html',
  styleUrls: ['./task-component.component.css'],
  providers: [ TaskService ]
})
export class AppSearchTraineesComponent implements OnInit {
  title = 'Add Tasks';
  task: Task[];
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
    this.getAssignedTasks();
  }

  /*
  * Go ahead and load a list of all current tasks that exist
  */
  getTasks(): void {
    this._taskService.getTasks()
      .subscribe(tasks => {
        this.tasks = tasks as Task[]
    });
  }
  getAssignedTasks(): void {
    this._taskService.getAssignedTasks()
      .subscribe(assigned => {
        this.assigned_tasks = Assigned as Assigned_Task[]
    });
  }

  /*
  * Used to start the search for a trainee. Sends the value of all of the input fields, sort out 
  * which ones are being used for the query on the back-end
  */
  addTask(taskId: number, courseId: number, batchId: string, deadline: Date, desc: string): void {
    var newTask = new Task(taskId, courseId, desc);
    this._taskService.addTask(newTask)
    .subscribe(tsks => {
        this.tasks = tsks as Task[]
    });
    var newAssigned = new Assigned_Task(newTask, batchId, deadline)
    this._taskService.addAssignedTask(taskId, courseId, batchId, deadline, desc)
    .subscribe(tsks => {
        this.tasks = tsks as Task[]
    });
    this.taskId.nativeElement.value='';
    this.courseId.nativeElement.value='';
    this.batchId.nativeElement.value='';
    this.deadline.nativeElement.value='';
    this.taskDescription.nativeElement.value='';
  }

  /*
  * Adds a trainee to the trainee collection in the database. Something similar to this method will need to be used in
  * the create batch component for every trainee specified by the admin, but no longer has use in the search
  * trainees page
  */
  addTrainee(trainee_id: string, email: string, firs: string, las: string, batch_id: string ): void {
    this._traineeService.addTrainee(trainee_id, email, firs, las, batch_id)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }

  /*
  * Activated by the red X to the left of the trainee's name on the list. Sends the trainee_id
  * of the trainee to be deleted to the service class. trainee_id is a unique identifier so no 
  * need to send any other info about the trainee
  */
  deleteTrainee(_id: string): void {
    this._traineeService.deleteTrainee(_id)
    .subscribe(emps => {
      this.trainees = emps as Trainee[]
    });
  }
}
