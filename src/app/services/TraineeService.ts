/*
* Trainee Service
* Handles methods associated with trainees. Handles delete trainees from View Batch,
* delete trainees from Search Trainees, possibly more depending on how create batch
* is implemented down the line. 
*/
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Trainee } from '../models/trainee';
import { City } from '../models/city';

@Injectable( {
    providedIn: 'root',
})
export class TraineeService {
  constructor(private http: HttpClient) {}

  /*
  * CWM
  * Mapped to from the search trainees page. Returns all trainees currently going through ILP
  */
  getAllTrainees(): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist');
  }

  /*
  * CWM
  * Mapped to from the view batch page. Returns all trainees in the batch that is being viewed.
  */
  getBatchTrainees(batch_id: string): Observable<Trainee[]> {
    return this.http.get<Trainee[]>('http://localhost:3000/traineelist/batch', { params: {batch_id: batch_id}});
  }

  /*
  * CWM
  * Mapped to from the search trainees page. Returns the search results for the criteria given
  */
  getTraineeByAll(traineeID: string, email: string, first: string, last: string, batchID: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/search', { params: {trainee_id: traineeID, email: email, first_name: first, last_name: last, batch_id: batchID}});
  }

  /*
  * CWM
  * Mapped to from view-trainee-component. Gets all of the trainee information from the database
  */
  getTrainee(traineeID: string): Observable<Trainee> {
      return this.http.get<Trainee>('http://localhost:3000/trainee', { params: {trainee_id: traineeID}});
  }

  /*
  * CWM
  * Mapped to the view trainee page. Deletes the selected city preference then returns as the modified list of cities
  */
  deleteCity(traineeID: string, city: string, state: string): Observable<City[]> {
      return this.http.get<City[]>('http://localhost:3000/trainee/deletecity', { params: {trainee_id: traineeID, city: city, state: state}});
  }

  /*
  * CWM
  * Mapped to the view trainee page. Deletes the selected domain preference then returns as the modified list of domains
  */
  deleteDomain(traineeID: string, dom: string): Observable<string[]> {
      return this.http.get<string[]>('http://localhost:3000/trainee/deletedomain', { params: {trainee_id: traineeID, domain: dom}});
  }

  /*
  * CWM
  * Currently not mapped to. Something like this method path will be used when creating a batch as that's when trainees wil be added
  */
  addTrainee(trainee_id: string, email: string, first: string, last: string, batch_id: string): Observable<Trainee[]> {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/add', { params: {trainee_id: trainee_id, email: email, first: first, last: last, batch_id: batch_id}});
  }

  /*
  * CWM
  * Mapped to from the search trainee page. Deletes the trainee from the general trainee collection as well as all their batch. Returns trainees still in batch
  */
  deleteTrainee(_id: string, b_id: string) {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/delete', { params: {trainee_id: _id, batch_id: b_id}});
  }

  /*
  * CWM 
  * Mapped to from the view batch page. Deletes the trainee from that batch and general trainee collection. Returns trainees now in general trainees collection
  */
  deleteBatchTrainee(_id: string, b_id: string) {
      return this.http.get<Trainee[]>('http://localhost:3000/traineelist/batch/delete', { params: {trainee_id: _id, batch_id: b_id}});
  }
}