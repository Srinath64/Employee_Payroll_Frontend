import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  template: '<app-add [employeeData]="employee"></app-add>',  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: Employee[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService,
              private snackBar: MatSnackBar
              ) { }

  ngOnInit(): void {
    this.httpService.getEmployeeData().subscribe(data => {
      this.employeeDetails = data.data;
      this.employeeCount = this.employeeDetails.length;
      console.log(this.employeeDetails);
    });
  }

  remove(id: number): void {
    console.log(id)
    this.httpService.deleteEmployeeData(id).subscribe(response => {
      console.log(response);
      this.ngOnInit();
      this.snackBar.open('Deleted Successfully!', 'Dismiss', {duration: 4000, verticalPosition: 'top'});
    });
  }
}
