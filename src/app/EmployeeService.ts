import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './employee';

@Injectable( {
    providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employeelist');
  }

  getEmployeeByFirst(nam: string): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employeelist/first:' + nam);
  }

  getEmployeeByLast(nam: string): Observable<Employee[]> {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/last:' + nam);
  }

  getEmployeeByCity(nam: string): Observable<Employee[]> {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/city:' + nam);
  }

  getEmployeeByState(nam: string): Observable<Employee[]> {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/state:' + nam);
  }

  getEmployeeByAll(first: string, last: string, cit: string, stat: string): Observable<Employee[]> {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/all', { params: {first: first, last: last, city: cit, state: stat}});
  }

  addEmployee(first: string, last: string, city: string, state: string): Observable<Employee[]> {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/add', { params: {first: first, last: last, city: city, state: state}});
  }

  deleteEmployee(_id: string) {
      return this.http.get<Employee[]>('http://localhost:3000/employeelist/delete', { params: {_id: _id}});
  }
}