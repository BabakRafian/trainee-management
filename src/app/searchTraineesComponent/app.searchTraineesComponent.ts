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

  ngOnInit() {
    this.getTrainees();
  }

  getTrainees(): void {
    this._traineeService.getAllTrainees()
      .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }
  
  getTraineeById(t_id: string): void {
    this._traineeService.getTraineeById(t_id)
    .subscribe(emps => {
      this.trainees = emps as Trainee[]
    });
    this.searchTextEmail.nativeElement.value = '';
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextBatchId.nativeElement.value = '';
  }

  getTraineeByEmail(em: string): void {
    this._traineeService.getTraineeByEmail(em)
    .subscribe(emps => {
      this.trainees = emps as Trainee[]
    });
    this.searchTextTraineeId.nativeElement.value = '';
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextBatchId.nativeElement.value = '';
  }

  getTraineeByFirst(firs: string): void {
    this._traineeService.getTraineeByFirst(firs)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
    this.searchTextTraineeId.nativeElement.value = '';
    this.searchTextEmail.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextBatchId.nativeElement.value = '';
  }

  getTraineeByLast(las: string): void {
    this._traineeService.getTraineeByLast(las)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
    this.searchTextTraineeId.nativeElement.value = '';
    this.searchTextEmail.nativeElement.value = '';
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextBatchId.nativeElement.value = '';
  }

  getTraineeByBatch(bat: string): void {
    this._traineeService.getTraineeByBatch(bat)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
    this.searchTextTraineeId.nativeElement.value = '';
    this.searchTextEmail.nativeElement.value = '';
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
  }

  getTraineeByAll(id: string, email: string, firs: string, las: string, batch: string): void {
    this._traineeService.getTraineeByAll(id, email, firs, las, batch)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }

  addTrainee(trainee_id: string, email: string, firs: string, las: string, batch_id: string ): void {
    this._traineeService.addTrainee(trainee_id, email, firs, las, batch_id)
    .subscribe(emps => {
        this.trainees = emps as Trainee[]
    });
  }

  deleteTrainee(_id: string): void {
    this._traineeService.deleteTrainee(_id)
    .subscribe(emps => {
      this.trainees = emps as Trainee[]
    });
  }
}
