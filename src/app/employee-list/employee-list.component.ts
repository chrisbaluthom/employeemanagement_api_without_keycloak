import { Component, OnInit } from '@angular/core';
import {Observable, of} from "rxjs";
import {Employee} from "../Employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {

  employees$: Observable<Employee[]>;
  search :string = "";

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Employee[]>('http://localhost:8089/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    });
  }

  protected readonly of = of;
  selectedEmployee?: Employee;

  onSelect(employee: Employee) {
    this.selectedEmployee = employee;
  }

  public resetSelectedEmployee() : void {
    this.selectedEmployee = undefined;
  }

  showAll() {
    //in this case go back to the top (refresh page like)
    this.search = "";
  }

  addEmployee() {
    //show add employee screen
    this.selectedEmployee = new Employee();
  }

  contentChanged(event: Event) {
    //search employees for matches and highlight them. if search bar is empty dont highlight anything
    this.search = (event.target as HTMLInputElement).value;
  }

  foundViaSearch(employee :Employee) {
    if (this.search !== "")
    {
      if (employee.firstName !== undefined && employee.lastName !== undefined && employee.firstName.concat(" ", employee.lastName).toLowerCase().search(this.search.toLowerCase()) !== -1)
      {
        return "selectedViaSearch";
      }
    }
    return "normalized";
  }
}
