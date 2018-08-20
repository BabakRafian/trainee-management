import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { EmployeeService } from './EmployeeService';
import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ EmployeeService ]
})
export class AppComponent implements OnInit {
  title = 'roundtwo';
  employees: Employee[];

  @ViewChild('searchTextFirst') searchTextFirst: ElementRef;
  @ViewChild('searchTextLast') searchTextLast: ElementRef;
  @ViewChild('searchTextCity') searchTextCity: ElementRef;
  @ViewChild('searchTextState') searchTextState: ElementRef;

  constructor(private _employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this._employeeService.getAllEmployees()
      .subscribe(emps => {
        this.employees = emps as Employee[]
    });
  }
  
  getEmployeeByFirst(firs: string): void {
    this._employeeService.getEmployeeByFirst(firs)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
    this.searchTextLast.nativeElement.value = '';
    this.searchTextCity.nativeElement.value = '';
    this.searchTextState.nativeElement.value = '';
  }

  getEmployeeByLast(las: string): void {
    this._employeeService.getEmployeeByLast(las)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextCity.nativeElement.value = '';
    this.searchTextState.nativeElement.value = '';
  }

  getEmployeeByCity(cit: string): void {
    this._employeeService.getEmployeeByCity(cit)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextState.nativeElement.value = '';
  }

  getEmployeeByState(stat: string): void {
    this._employeeService.getEmployeeByState(stat)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
    this.searchTextFirst.nativeElement.value = '';
    this.searchTextLast.nativeElement.value = '';
    this.searchTextCity.nativeElement.value = '';
  }

  getEmployeeByAll(firs: string, las: string, cit: string, stat: string): void {
    this._employeeService.getEmployeeByAll(firs, las, cit, stat)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
  }

  addEmployee(firs: string, las: string, cit: string, stat: string): void {
    this._employeeService.addEmployee(firs, las, cit, stat)
    .subscribe(emps => {
        this.employees = emps as Employee[]
    });
  }

  deleteEmployee(_id: string): void {
    this._employeeService.deleteEmployee(_id)
    .subscribe(emps => {
      this.employees = emps as Employee[]
    });
  }
}
