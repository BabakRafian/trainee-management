/*
* CWM
* View Batch Component
* General view of a single batch. Able to add tasks specifically to this batch, view tasks for batch,
* and view all of the trainees in this batch
*/
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TaskService } from '../services/TaskService';
import { TraineeService } from '../services/TraineeService';
import { Task } from '../models/task';
import { Assigned_Task } from '../models/assignedTask';
import { Trainee } from '../models/trainee';


@Component({
  selector: 'view-batch',
  templateUrl: './view-batch-component.component.html',
  styleUrls: ['./view-batch-component.component.css'],
  providers: [ TaskService, TraineeService ]
})
export class ViewBatchComponent implements OnInit {
  title = 'View Batch';
  tasks: Task[];
  assigned_tasks: Assigned_Task[];
  trainees: Trainee[];
  batchIdText = "JUN_18_1";//will get this from session attributes
  startdate = '';//will also get this from session attributes

  @ViewChild('taskId') taskId: ElementRef;
  @ViewChild('courseId') courseId: ElementRef;
  @ViewChild('batchId') batchId: ElementRef;
  @ViewChild('deadline') deadline: ElementRef;
  @ViewChild('taskDescription') taskDescription: ElementRef;

  constructor(private _taskService: TaskService, private _traineeService: TraineeService) {}

  /*
  * ngOnInit executes when the page is loaded. 
  */
  ngOnInit() {
    this.getBatchTasks();
    this.getTrainees();
  }

  /*
  * Go ahead and load a list of all current trainees in all batches on starting the page
  */
  getTrainees(): void {
    this._traineeService.getBatchTrainees(this.batchIdText)
      .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }

  /*
  * Go ahead and load a list of all current tasks that exist
  */
  getBatchTasks(): void {
    this._taskService.getBatchTasks(this.batchIdText)
      .subscribe(tsks => {
        this.tasks = tsks as Task[]
    });
  }

  /*
  * Used to start the search for a trainee. Sends the value of all of the input fields, sort out 
  * which ones are being used for the query on the back-end
  */
  addTask(taskId: string, courseId: string, deadline: string, desc: string): void {
    this._taskService.addTask(taskId, courseId, this.batchIdText, deadline, desc)
    .subscribe(tsks => {
       this.tasks = tsks as Task[];
     });//batchIdText supplied by session
    this.taskId.nativeElement.value='';
    this.courseId.nativeElement.value='';
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
      this.getBatchTasks();//Populate box with only this batch's tasks. Probably should separate delete/add tasks for batches/general
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
      this.getTrainees();//BAD BAD THIS IS BAD. We have to separate out a few more methods. There should be different method for deleting from this view than the trainee list view on the service
    });
  }
}

