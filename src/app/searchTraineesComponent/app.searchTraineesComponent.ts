import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { TraineeService } from '../services/TraineeService';
import { Trainee } from '../models/trainee';

@Component({
  selector: 'app-root',
  templateUrl: './app.searchTraineesComponent.html',
  styleUrls: ['./app.searchTraineesComponent.css'],
  providers: [ TraineeService ]
})
export class AppSearchTraineesComponent implements OnInit {
  title = 'Search Trainees';
  trainees: Trainee[];

  @ViewChild('searchTextTraineeId') searchTextTraineeId: ElementRef;
  @ViewChild('searchTextEmail') searchTextEmail: ElementRef;
  @ViewChild('searchTextFirst') searchTextFirst: ElementRef;
  @ViewChild('searchTextLast') searchTextLast: ElementRef;
  @ViewChild('searchTextBatchId') searchTextBatchId: ElementRef;

  constructor(private _traineeService: TraineeService) {}

  /*
  * ngOnInit executes when the page is loaded. 
  */
  ngOnInit() {
    this.getTrainees();
  }

  /*
  * Go ahead and load a list of all current trainees in all batches on starting the page
  */
  getTrainees(): void {
    this._traineeService.getAllTrainees()
      .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }

  /*
  * Used to start the search for a trainee. Sends the value of all of the input fields, sort out 
  * which ones are being used for the query on the back-end
  */
  getTraineeByAll(id: string, email: string, firs: string, las: string, batch: string): void {
    this._traineeService.getTraineeByAll(id, email, firs, las, batch)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
    this.searchTextTraineeId.nativeElement.value = '';
    this.searchTextEmail.nativeElement.value = '';
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextBatchId.nativeElement.value = '';
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
