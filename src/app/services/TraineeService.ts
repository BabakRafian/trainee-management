import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trainee } from '../models/trainee';

@Injectable( {
    providedIn: 'root',
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  getAllTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist');
  }

  getTraineeById(nam: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist/id:' + nam);
  }

  getTraineeByEmail(nam: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist/email:' + nam);
  }

  getTraineeByFirst(nam: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist/first:' + nam);
  }

  getTraineeByLast(nam: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/last:' + nam);
  }

  getTraineeByBatch(nam: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist/batch:' + nam);
  }

  getTraineeByAll(traineeID: string, email: string, first: string, last: string, batchID: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/all', { params: {trainee_id: traineeID, email: email, first: first, last: last, batch_id: batchID}});
  }

  addTrainee(trainee_id: string, email: string, first: string, last: string, batch_id: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/add', { params: {trainee_id: trainee_id, email: email, first: first, last: last, batch_id: batch_id}});
  }

  deleteTrainee(_id: string) {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/delete', { params: {trainee_id: _id}});
  }
}