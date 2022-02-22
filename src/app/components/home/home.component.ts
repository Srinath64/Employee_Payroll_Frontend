import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee';
import { HttpService } from 'src/app/service/http.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public employeeCount: number = 0; 
  public employeeDetails: Employee[] = [];

  constructor(private httpService: HttpService,
              private router: Router,
              private dataService: DataService
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
    });
  }

  update(employee: Employee): void {
    this.dataService.changeEmployee(employee);
    this.router.navigateByUrl('/add' + employee.id);
    this.httpService.updateEmployeData(employee.id, employee).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    });
  }


}
