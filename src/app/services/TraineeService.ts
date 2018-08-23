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

  getTraineeByAll(traineeID: string, email: string, first: string, last: string, batchID: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/search', { params: {trainee_id: traineeID, email: email, firstname: first, lastname: last, batch_id: batchID}});
  }

  addTrainee(trainee_id: string, email: string, first: string, last: string, batch_id: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/add', { params: {trainee_id: trainee_id, email: email, first: first, last: last, batch_id: batch_id}});
  }

  deleteTrainee(_id: string) {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/delete', { params: {trainee_id: _id}});
  }
}